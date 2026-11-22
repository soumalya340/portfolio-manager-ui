/**
 * Ethereum mainnet reader: native ETH, a curated list of major ERC-20s, and Uniswap v3 positions.
 * Talks plain JSON-RPC (batched) to a free public node; ABI encoding/decoding is hand-rolled with
 * BigInt so no web3 library is needed. All bigint constants use BigInt(...) because the project
 * targets ES2017, where bigint literals are not allowed.
 */
import type {
  ChainReader,
  LpPosition,
  PositionToken,
  TokenBalance,
  WalletSnapshot,
} from "./types";

const RPC_URL = "https://ethereum-rpc.publicnode.com";
const RPC_TIMEOUT_MS = 12_000;
/** Max calls per JSON-RPC batch; larger call lists are split into parallel chunks. */
const MAX_BATCH = 100;
/** Newest position NFTs inspected per wallet (one batched call each for id + position data). */
const MAX_SCAN = 100;
/** Open positions returned per wallet. */
const MAX_POSITIONS = 25;

const UNISWAP_V3_NPM = "0xc36442b4a4522e871399cd717abdd847ab11fe88";
const UNISWAP_V3_FACTORY = "0x1f98431c8ad98523631ae4a59f267346ea31f984";

// Function selectors (first 4 bytes of keccak256 of the signature).
const SEL = {
  balanceOf: "0x70a08231", // balanceOf(address)
  tokenOfOwnerByIndex: "0x2f745c59", // tokenOfOwnerByIndex(address,uint256)
  positions: "0x99fbab88", // positions(uint256)
  getPool: "0x1698ee82", // getPool(address,address,uint24)
  slot0: "0x3850c7bd", // slot0()
  feeGrowthGlobal0X128: "0xf3058399", // feeGrowthGlobal0X128()
  feeGrowthGlobal1X128: "0x46141319", // feeGrowthGlobal1X128()
  ticks: "0xf30dba93", // ticks(int24)
  symbol: "0x95d89b41", // symbol()
  decimals: "0x313ce567", // decimals()
} as const;

const ZERO = BigInt(0);
const ONE = BigInt(1);
const Q32 = BigInt(1) << BigInt(32);
const Q96 = BigInt(1) << BigInt(96);
const Q128 = BigInt(1) << BigInt(128);
const Q256 = BigInt(1) << BigInt(256);
const MAX_UINT256 = Q256 - ONE;
const INT256_SIGN = BigInt(1) << BigInt(255);

// ---------------------------------------------------------------------------------------------
// Curated token list
// ---------------------------------------------------------------------------------------------

interface KnownToken {
  address: string; // lowercase
  symbol: string;
  name: string;
  decimals: number;
  /** Coinbase ticker, or null when Coinbase has no price for it. */
  priceSymbol: string | null;
  /** Symbol shown in pool labels / position legs (WETH reads as ETH). */
  display?: string;
}

const TOKEN_LIST: KnownToken[] = [
  // Stablecoins
  { address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", symbol: "USDC", name: "USD Coin", decimals: 6, priceSymbol: "USDC" },
  { address: "0xdac17f958d2ee523a2206206994597c13d831ec7", symbol: "USDT", name: "Tether USD", decimals: 6, priceSymbol: "USDT" },
  { address: "0x6b175474e89094c44da98b954eedeac495271d0f", symbol: "DAI", name: "Dai Stablecoin", decimals: 18, priceSymbol: "DAI" },
  { address: "0xdc035d45d973e3ec169d2276ddab16f1e407384f", symbol: "USDS", name: "USDS Stablecoin", decimals: 18, priceSymbol: "USDS" },
  { address: "0x6c3ea9036406852006290770bedfcaba0e23a0e8", symbol: "PYUSD", name: "PayPal USD", decimals: 6, priceSymbol: "PYUSD" },
  { address: "0x056fd409e1d7a124bd7017459dfea2f387b6d5cd", symbol: "GUSD", name: "Gemini dollar", decimals: 2, priceSymbol: "GUSD" },
  { address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3", symbol: "USDe", name: "Ethena USDe", decimals: 18, priceSymbol: null },
  // ETH / BTC wrappers
  { address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", symbol: "WETH", name: "Wrapped Ether", decimals: 18, priceSymbol: "ETH", display: "ETH" },
  { address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84", symbol: "stETH", name: "Lido Staked Ether", decimals: 18, priceSymbol: "ETH" },
  { address: "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0", symbol: "wstETH", name: "Wrapped liquid staked Ether 2.0", decimals: 18, priceSymbol: null },
  { address: "0xbe9895146f7af43049ca1c1ae358b0541ea49704", symbol: "cbETH", name: "Coinbase Wrapped Staked ETH", decimals: 18, priceSymbol: "CBETH" },
  { address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", symbol: "WBTC", name: "Wrapped BTC", decimals: 8, priceSymbol: "BTC" },
  { address: "0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf", symbol: "cbBTC", name: "Coinbase Wrapped BTC", decimals: 8, priceSymbol: "BTC" },
  { address: "0x45804880de22913dafe09f4980848ece6ecbaf78", symbol: "PAXG", name: "Paxos Gold", decimals: 18, priceSymbol: "PAXG" },
  // DeFi / governance
  { address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", symbol: "UNI", name: "Uniswap", decimals: 18, priceSymbol: "UNI" },
  { address: "0x514910771af9ca656af840dff83e8264ecf986ca", symbol: "LINK", name: "ChainLink Token", decimals: 18, priceSymbol: "LINK" },
  { address: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9", symbol: "AAVE", name: "Aave Token", decimals: 18, priceSymbol: "AAVE" },
  { address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2", symbol: "MKR", name: "Maker", decimals: 18, priceSymbol: "MKR" },
  { address: "0x56072c95faa701256059aa122697b133aded9279", symbol: "SKY", name: "SKY Governance Token", decimals: 18, priceSymbol: "SKY" },
  { address: "0x5a98fcbea516cf06857215779fd812ca3bef1b32", symbol: "LDO", name: "Lido DAO Token", decimals: 18, priceSymbol: "LDO" },
  { address: "0xc18360217d8f7ab5e7c516566761ea12ce7f9d72", symbol: "ENS", name: "Ethereum Name Service", decimals: 18, priceSymbol: "ENS" },
  { address: "0xd533a949740bb3306d119cc777fa900ba034cd52", symbol: "CRV", name: "Curve DAO Token", decimals: 18, priceSymbol: "CRV" },
  { address: "0xc00e94cb662c3520282e6f5717214004a7f26888", symbol: "COMP", name: "Compound", decimals: 18, priceSymbol: "COMP" },
  { address: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f", symbol: "SNX", name: "Synthetix Network Token", decimals: 18, priceSymbol: "SNX" },
  { address: "0x111111111117dc0aa78b770fa6a738034120c302", symbol: "1INCH", name: "1INCH Token", decimals: 18, priceSymbol: "1INCH" },
  { address: "0xba100000625a3754423978a60c9317c58a424e3d", symbol: "BAL", name: "Balancer", decimals: 18, priceSymbol: "BAL" },
  { address: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", symbol: "SUSHI", name: "SushiToken", decimals: 18, priceSymbol: "SUSHI" },
  { address: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e", symbol: "YFI", name: "yearn.finance", decimals: 18, priceSymbol: "YFI" },
  { address: "0xd33526068d116ce69f19a9ee46f0bd304f21a51f", symbol: "RPL", name: "Rocket Pool Protocol", decimals: 18, priceSymbol: "RPL" },
  { address: "0x808507121b80c02388fad14726482e061b8da827", symbol: "PENDLE", name: "Pendle", decimals: 18, priceSymbol: "PENDLE" },
  { address: "0x57e114b691db790c35207b2e685d4a43181e6061", symbol: "ENA", name: "ENA", decimals: 18, priceSymbol: "ENA" },
  { address: "0xec53bf9167f50cdeb3ae105f56099aaab9061f83", symbol: "EIGEN", name: "Eigen", decimals: 18, priceSymbol: "EIGEN" },
  { address: "0xfe0c30065b384f05761f15d0cc899d4f9f9cc0eb", symbol: "ETHFI", name: "ether.fi governance token", decimals: 18, priceSymbol: "ETHFI" },
  { address: "0x58d97b57bb95320f9a05dc918aef65434969c2b2", symbol: "MORPHO", name: "Morpho Token", decimals: 18, priceSymbol: "MORPHO" },
  { address: "0xfaba6f8e4a5e8ab82f62fe7c39859fa577269be3", symbol: "ONDO", name: "Ondo", decimals: 18, priceSymbol: "ONDO" },
  // Infra / L2 / gaming / AI
  { address: "0x455e53cbb86018ac2b8092fdcd39d8444affc3f6", symbol: "POL", name: "Polygon Ecosystem Token", decimals: 18, priceSymbol: "POL" },
  { address: "0xf57e7e7c23978c3caec3c3548e3d615c346e79ff", symbol: "IMX", name: "Immutable X", decimals: 18, priceSymbol: "IMX" },
  { address: "0xc944e90c64b2c07662a292be6244bdf05cda44a7", symbol: "GRT", name: "Graph Token", decimals: 18, priceSymbol: "GRT" },
  { address: "0x4a220e6096b25eadb88358cb44068a3248254675", symbol: "QNT", name: "Quant", decimals: 18, priceSymbol: "QNT" },
  { address: "0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24", symbol: "RNDR", name: "Render Token", decimals: 18, priceSymbol: "RENDER" },
  { address: "0xaea46a60368a7bd060eec7df8cba43b7ef41ad85", symbol: "FET", name: "Fetch", decimals: 18, priceSymbol: "FET" },
  { address: "0x163f8c2467924be0ae7b5347228cabf260318753", symbol: "WLD", name: "Worldcoin", decimals: 18, priceSymbol: "WLD" },
  { address: "0x5283d291dbcf85356a21ba090e6db59121208b44", symbol: "BLUR", name: "Blur", decimals: 18, priceSymbol: "BLUR" },
  { address: "0x4d224452801aced8b2f0aebe155379bb5d594381", symbol: "APE", name: "ApeCoin", decimals: 18, priceSymbol: "APE" },
  { address: "0x3845badade8e6dff049820680d1f14bd3903a5d0", symbol: "SAND", name: "SAND", decimals: 18, priceSymbol: "SAND" },
  { address: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942", symbol: "MANA", name: "Decentraland MANA", decimals: 18, priceSymbol: "MANA" },
  { address: "0xbb0e17ef65f82ab018d8edd776e8dd940327b28b", symbol: "AXS", name: "Axie Infinity Shard", decimals: 18, priceSymbol: "AXS" },
  { address: "0x3506424f91fd33084466f402d5d97f05f8e3b4af", symbol: "CHZ", name: "chiliZ", decimals: 18, priceSymbol: "CHZ" },
  // Memes
  { address: "0x6982508145454ce325ddbe47a25d4ec3d2311933", symbol: "PEPE", name: "Pepe", decimals: 18, priceSymbol: "PEPE" },
  { address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce", symbol: "SHIB", name: "SHIBA INU", decimals: 18, priceSymbol: "SHIB" },
];

const KNOWN_TOKENS = new Map(TOKEN_LIST.map((t) => [t.address, t]));

/** Ordering for pool labels: the "quote" side (stable > ETH > BTC) goes second, e.g. "ETH / USDC". */
const QUOTE_RANK: Record<string, number> = {
  USDC: 3, USDT: 3, DAI: 3, USDS: 3, PYUSD: 3, GUSD: 3, USDe: 3,
  ETH: 2,
  WBTC: 1, cbBTC: 1,
};

// ---------------------------------------------------------------------------------------------
// JSON-RPC
// ---------------------------------------------------------------------------------------------

interface RpcCall {
  method: string;
  params: unknown[];
}

/** Per-call outcome: the hex result, or an error message. */
type RpcResult = { ok: true; value: string } | { ok: false; error: string };

interface RpcResponse {
  id: number;
  result?: unknown;
  error?: { message?: string };
}

async function rpcChunk(calls: RpcCall[]): Promise<RpcResult[]> {
  const body = calls.map((c, id) => ({ jsonrpc: "2.0", id, method: c.method, params: c.params }));
  const res = await fetch(RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(RPC_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Ethereum RPC returned HTTP ${res.status}`);
  const json: unknown = await res.json();
  if (!Array.isArray(json)) {
    const msg = (json as RpcResponse | null)?.error?.message;
    throw new Error(`Ethereum RPC rejected the batch${msg ? `: ${msg}` : ""}`);
  }
  const byId = new Map<number, RpcResponse>();
  for (const r of json as RpcResponse[]) byId.set(r.id, r);
  return calls.map((_, id): RpcResult => {
    const r = byId.get(id);
    if (!r) return { ok: false, error: "missing response" };
    if (r.error) return { ok: false, error: r.error.message ?? "RPC error" };
    if (typeof r.result !== "string") return { ok: false, error: "unexpected result" };
    return { ok: true, value: r.result };
  });
}

/** Sends calls as JSON-RPC batches (split into chunks of MAX_BATCH, sent in parallel). */
async function rpcBatch(calls: RpcCall[]): Promise<RpcResult[]> {
  if (calls.length === 0) return [];
  const chunks: RpcCall[][] = [];
  for (let i = 0; i < calls.length; i += MAX_BATCH) chunks.push(calls.slice(i, i + MAX_BATCH));
  const results = await Promise.all(chunks.map(rpcChunk));
  return results.flat();
}

function ethCall(to: string, data: string): RpcCall {
  return { method: "eth_call", params: [{ to, data }, "latest"] };
}

// ---------------------------------------------------------------------------------------------
// ABI helpers
// ---------------------------------------------------------------------------------------------

function encUint(v: bigint): string {
  return v.toString(16).padStart(64, "0");
}

function encInt(v: number): string {
  const big = BigInt(v);
  return encUint(big < ZERO ? Q256 + big : big);
}

function encAddress(a: string): string {
  return a.slice(2).toLowerCase().padStart(64, "0");
}

/** Splits an eth_call result into 32-byte hex words; throws on an empty (no contract / revert) result. */
function words(hex: string, min: number): string[] {
  const body = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (body.length < min * 64) throw new Error("short ABI response");
  const out: string[] = [];
  for (let i = 0; i + 64 <= body.length; i += 64) out.push(body.slice(i, i + 64));
  return out;
}

function wordUint(w: string): bigint {
  return BigInt(`0x${w}`);
}

function wordInt(w: string): number {
  const v = wordUint(w);
  return Number(v >= INT256_SIGN ? v - Q256 : v);
}

function wordAddress(w: string): string {
  return `0x${w.slice(24)}`;
}

function decodeUint(r: RpcResult): bigint | null {
  if (!r.ok) return null;
  try {
    return wordUint(words(r.value, 1)[0]);
  } catch {
    return null;
  }
}

function hexToUtf8(hex: string): string {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return new TextDecoder().decode(bytes);
}

/** Decodes an ABI `string` return, or a legacy `bytes32` one (e.g. MKR). */
function decodeSymbol(r: RpcResult): string | null {
  if (!r.ok) return null;
  const body = r.value.startsWith("0x") ? r.value.slice(2) : r.value;
  try {
    let text: string;
    if (body.length === 64) {
      text = hexToUtf8(body.replace(/(00)+$/, ""));
    } else {
      const w = words(body, 2);
      const offset = Number(wordUint(w[0])) / 32;
      const len = Number(wordUint(w[offset]));
      text = hexToUtf8(body.slice((offset + 1) * 64, (offset + 1) * 64 + len * 2));
    }
    const clean = text.replace(/[\u0000-\u001f]/g, "").trim();
    return clean.length > 0 && clean.length <= 32 ? clean : null;
  } catch {
    return null;
  }
}

/** Scales a raw integer amount by `decimals` without losing precision in the integer part. */
function toAmount(raw: bigint, decimals: number): number {
  const base = BigInt(10) ** BigInt(decimals);
  return Number(raw / base) + Number(raw % base) / Number(base);
}

// ---------------------------------------------------------------------------------------------
// Uniswap v3 math (ported from TickMath / LiquidityAmounts)
// ---------------------------------------------------------------------------------------------

const TICK_MAGIC: [number, bigint][] = [
  [0x2, BigInt("0xfff97272373d413259a46990580e213a")],
  [0x4, BigInt("0xfff2e50f5f656932ef12357cf3c7fdcc")],
  [0x8, BigInt("0xffe5caca7e10e4e61c3624eaa0941cd0")],
  [0x10, BigInt("0xffcb9843d60f6159c9db58835c926644")],
  [0x20, BigInt("0xff973b41fa98c081472e6896dfb254c0")],
  [0x40, BigInt("0xff2ea16466c96a3843ec78b326b52861")],
  [0x80, BigInt("0xfe5dee046a99a2a811c461f1969c3053")],
  [0x100, BigInt("0xfcbe86c7900a88aedcffc83b479aa3a4")],
  [0x200, BigInt("0xf987a7253ac413176f2b074cf7815e54")],
  [0x400, BigInt("0xf3392b0822b70005940c7a398e4b70f3")],
  [0x800, BigInt("0xe7159475a2c29b7443b29c7fa6e889d9")],
  [0x1000, BigInt("0xd097f3bdfd2022b8845ad8f792aa5825")],
  [0x2000, BigInt("0xa9f746462d870fdf8a65dc1f90e061e5")],
  [0x4000, BigInt("0x70d869a156d2a1b890bb3df62baf32f7")],
  [0x8000, BigInt("0x31be135f97d08fd981231505542fcfa6")],
  [0x10000, BigInt("0x9aa508b5b7a84e1c677de54f3e99bc9")],
  [0x20000, BigInt("0x5d6af8dedb81196699c329225ee604")],
  [0x40000, BigInt("0x2216e584f5fa1ea926041bedfe98")],
  [0x80000, BigInt("0x48a170391f7dc42444e8fa2")],
];

/** Exact port of TickMath.getSqrtRatioAtTick: sqrt(1.0001^tick) as a Q64.96. */
export function getSqrtRatioAtTick(tick: number): bigint {
  const absTick = Math.abs(tick);
  if (absTick > 887272) throw new Error(`tick out of range: ${tick}`);
  let ratio =
    (absTick & 0x1) !== 0
      ? BigInt("0xfffcb933bd6fad37aa2d162d1a594001")
      : BigInt("0x100000000000000000000000000000000");
  for (const [mask, magic] of TICK_MAGIC) {
    if ((absTick & mask) !== 0) ratio = (ratio * magic) >> BigInt(128);
  }
  if (tick > 0) ratio = MAX_UINT256 / ratio;
  return (ratio >> BigInt(32)) + (ratio % Q32 === ZERO ? ZERO : ONE);
}

function amount0ForLiquidity(sqrtA: bigint, sqrtB: bigint, liquidity: bigint): bigint {
  if (sqrtA > sqrtB) [sqrtA, sqrtB] = [sqrtB, sqrtA];
  return ((liquidity << BigInt(96)) * (sqrtB - sqrtA)) / sqrtB / sqrtA;
}

function amount1ForLiquidity(sqrtA: bigint, sqrtB: bigint, liquidity: bigint): bigint {
  if (sqrtA > sqrtB) [sqrtA, sqrtB] = [sqrtB, sqrtA];
  return (liquidity * (sqrtB - sqrtA)) / Q96;
}

/** LiquidityAmounts.getAmountsForLiquidity. */
export function getAmountsForLiquidity(
  sqrtPrice: bigint,
  sqrtA: bigint,
  sqrtB: bigint,
  liquidity: bigint,
): [bigint, bigint] {
  if (sqrtA > sqrtB) [sqrtA, sqrtB] = [sqrtB, sqrtA];
  if (sqrtPrice <= sqrtA) return [amount0ForLiquidity(sqrtA, sqrtB, liquidity), ZERO];
  if (sqrtPrice < sqrtB) {
    return [
      amount0ForLiquidity(sqrtPrice, sqrtB, liquidity),
      amount1ForLiquidity(sqrtA, sqrtPrice, liquidity),
    ];
  }
  return [ZERO, amount1ForLiquidity(sqrtA, sqrtB, liquidity)];
}

const mod256 = (v: bigint) => ((v % Q256) + Q256) % Q256;

/** Pool.getFeeGrowthInside for one token (all values are wrapping uint256 in Solidity). */
function feeGrowthInside(
  tick: number,
  tickLower: number,
  tickUpper: number,
  global: bigint,
  lowerOutside: bigint,
  upperOutside: bigint,
): bigint {
  const below = tick >= tickLower ? lowerOutside : mod256(global - lowerOutside);
  const above = tick < tickUpper ? upperOutside : mod256(global - upperOutside);
  return mod256(global - below - above);
}

// ---------------------------------------------------------------------------------------------
// Uniswap v3 positions
// ---------------------------------------------------------------------------------------------

interface RawPosition {
  id: bigint;
  token0: string;
  token1: string;
  fee: number;
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
  feeGrowthInside0Last: bigint;
  feeGrowthInside1Last: bigint;
  owed0: bigint;
  owed1: bigint;
}

interface TokenMeta {
  symbol: string;
  decimals: number;
  priceSymbol: string | null;
}

function decodePosition(id: bigint, r: RpcResult): RawPosition {
  if (!r.ok) throw new Error(r.error);
  const w = words(r.value, 12);
  return {
    id,
    token0: wordAddress(w[2]),
    token1: wordAddress(w[3]),
    fee: Number(wordUint(w[4])),
    tickLower: wordInt(w[5]),
    tickUpper: wordInt(w[6]),
    liquidity: wordUint(w[7]),
    feeGrowthInside0Last: wordUint(w[8]),
    feeGrowthInside1Last: wordUint(w[9]),
    owed0: wordUint(w[10]),
    owed1: wordUint(w[11]),
  };
}

function errText(e: unknown): string {
  if (e instanceof Error) return e.name === "TimeoutError" ? "request timed out" : e.message;
  return String(e);
}

async function readUniswapV3(
  owner: string,
  count: bigint,
  warnings: string[],
): Promise<LpPosition[]> {
  const total = Number(count);
  const n = Math.min(total, MAX_SCAN);
  if (n === 0) return [];
  if (total > MAX_SCAN) {
    warnings.push(`Wallet holds ${total} Uniswap v3 position NFTs; only the newest ${MAX_SCAN} were checked.`);
  }

  // 1. Position NFT ids, newest first: closed positions usually pile up at the low indices.
  const idResults = await rpcBatch(
    Array.from({ length: n }, (_, i) =>
      ethCall(UNISWAP_V3_NPM, SEL.tokenOfOwnerByIndex + encAddress(owner) + encUint(BigInt(total - 1 - i))),
    ),
  );
  const ids: bigint[] = [];
  for (const r of idResults) {
    const id = decodeUint(r);
    if (id !== null) ids.push(id);
  }
  if (ids.length < idResults.length) {
    warnings.push(`${idResults.length - ids.length} Uniswap v3 position id(s) could not be read.`);
  }
  if (ids.length === 0) return [];

  // 2. Position data; drop closed positions (no liquidity, nothing owed).
  const posResults = await rpcBatch(
    ids.map((id) => ethCall(UNISWAP_V3_NPM, SEL.positions + encUint(id))),
  );
  let positions: RawPosition[] = [];
  const unreadable: string[] = [];
  posResults.forEach((r, i) => {
    try {
      const p = decodePosition(ids[i], r);
      if (p.liquidity > ZERO || p.owed0 > ZERO || p.owed1 > ZERO) positions.push(p);
    } catch {
      unreadable.push(`#${ids[i]}`);
    }
  });
  if (unreadable.length > 0) {
    warnings.push(`Uniswap v3 position(s) ${unreadable.slice(0, 5).join(", ")}${unreadable.length > 5 ? "…" : ""} could not be read.`);
  }
  if (positions.length > MAX_POSITIONS) {
    warnings.push(`Wallet has ${positions.length} open Uniswap v3 positions; only the newest ${MAX_POSITIONS} are shown.`);
    positions = positions.slice(0, MAX_POSITIONS);
  }
  if (positions.length === 0) return [];

  // 3. Pool addresses + metadata for tokens outside the curated list.
  const poolKey = (p: RawPosition) => `${p.token0}:${p.token1}:${p.fee}`;
  const poolKeys = [...new Set(positions.map(poolKey))];
  const unknownTokens = [
    ...new Set(positions.flatMap((p) => [p.token0, p.token1]).filter((t) => !KNOWN_TOKENS.has(t))),
  ];
  const metaCalls: RpcCall[] = [
    ...poolKeys.map((k) => {
      const [t0, t1, fee] = k.split(":");
      return ethCall(UNISWAP_V3_FACTORY, SEL.getPool + encAddress(t0) + encAddress(t1) + encUint(BigInt(fee)));
    }),
    ...unknownTokens.flatMap((t) => [ethCall(t, SEL.symbol), ethCall(t, SEL.decimals)]),
  ];
  const metaResults = await rpcBatch(metaCalls);

  const poolAddress = new Map<string, string>();
  poolKeys.forEach((k, i) => {
    const r = metaResults[i];
    if (r.ok && r.value.length >= 66) {
      const addr = wordAddress(words(r.value, 1)[0]);
      if (!/^0x0{40}$/.test(addr)) poolAddress.set(k, addr);
    }
  });

  const tokenMeta = new Map<string, TokenMeta>();
  for (const t of TOKEN_LIST) {
    tokenMeta.set(t.address, { symbol: t.display ?? t.symbol, decimals: t.decimals, priceSymbol: t.priceSymbol });
  }
  unknownTokens.forEach((t, i) => {
    const symbol = decodeSymbol(metaResults[poolKeys.length + i * 2]);
    const decimals = decodeUint(metaResults[poolKeys.length + i * 2 + 1]);
    if (decimals === null || decimals > BigInt(36)) return;
    // Unlisted tokens are never priced: a look-alike symbol must not borrow a real token's price.
    tokenMeta.set(t, { symbol: symbol ?? `${t.slice(0, 6)}…${t.slice(-4)}`, decimals: Number(decimals), priceSymbol: null });
  });

  // 4. Pool state (slot0 + global fee growth) and the position's boundary ticks.
  const pools = [...new Set(poolAddress.values())];
  const stateCalls: RpcCall[] = [
    ...pools.flatMap((pool) => [
      ethCall(pool, SEL.slot0),
      ethCall(pool, SEL.feeGrowthGlobal0X128),
      ethCall(pool, SEL.feeGrowthGlobal1X128),
    ]),
  ];
  const tickCallIndex = new Map<RawPosition, number>();
  for (const p of positions) {
    const pool = poolAddress.get(poolKey(p));
    if (!pool) continue;
    tickCallIndex.set(p, stateCalls.length);
    stateCalls.push(ethCall(pool, SEL.ticks + encInt(p.tickLower)), ethCall(pool, SEL.ticks + encInt(p.tickUpper)));
  }
  const stateResults = await rpcBatch(stateCalls);

  const poolState = new Map<string, { sqrtPrice: bigint; tick: number; fg0: bigint | null; fg1: bigint | null }>();
  pools.forEach((pool, i) => {
    const slot0 = stateResults[i * 3];
    if (!slot0.ok) return;
    try {
      const w = words(slot0.value, 2);
      poolState.set(pool, {
        sqrtPrice: wordUint(w[0]),
        tick: wordInt(w[1]),
        fg0: decodeUint(stateResults[i * 3 + 1]),
        fg1: decodeUint(stateResults[i * 3 + 2]),
      });
    } catch {
      // reported per position below
    }
  });

  // 5. Assemble.
  const out: LpPosition[] = [];
  for (const p of positions) {
    const m0 = tokenMeta.get(p.token0);
    const m1 = tokenMeta.get(p.token1);
    const pool = poolAddress.get(poolKey(p));
    const state = pool ? poolState.get(pool) : undefined;
    if (!m0 || !m1 || !state) {
      warnings.push(`Uniswap v3 position #${p.id} skipped: ${!state ? "pool state unavailable" : "token metadata unavailable"}.`);
      continue;
    }

    const [raw0, raw1] = getAmountsForLiquidity(
      state.sqrtPrice,
      getSqrtRatioAtTick(p.tickLower),
      getSqrtRatioAtTick(p.tickUpper),
      p.liquidity,
    );

    // Uncollected fees = tokensOwed + liquidity × fee growth since the position was last touched.
    // Falls back to the tokensOwed snapshot if the tick/fee-growth reads failed.
    let fee0 = p.owed0;
    let fee1 = p.owed1;
    const ti = tickCallIndex.get(p);
    const lower = ti === undefined ? null : stateResults[ti];
    const upper = ti === undefined ? null : stateResults[ti + 1];
    if (p.liquidity > ZERO && lower?.ok && upper?.ok && state.fg0 !== null && state.fg1 !== null) {
      try {
        const lw = words(lower.value, 4);
        const uw = words(upper.value, 4);
        const inside0 = feeGrowthInside(state.tick, p.tickLower, p.tickUpper, state.fg0, wordUint(lw[2]), wordUint(uw[2]));
        const inside1 = feeGrowthInside(state.tick, p.tickLower, p.tickUpper, state.fg1, wordUint(lw[3]), wordUint(uw[3]));
        fee0 += (p.liquidity * mod256(inside0 - p.feeGrowthInside0Last)) / Q128;
        fee1 += (p.liquidity * mod256(inside1 - p.feeGrowthInside1Last)) / Q128;
      } catch {
        // keep the tokensOwed snapshot
      }
    }

    let legs: PositionToken[] = [
      { symbol: m0.symbol, amount: toAmount(raw0, m0.decimals), priceSymbol: m0.priceSymbol },
      { symbol: m1.symbol, amount: toAmount(raw1, m1.decimals), priceSymbol: m1.priceSymbol },
    ];
    let fees: PositionToken[] = [
      { symbol: m0.symbol, amount: toAmount(fee0, m0.decimals), priceSymbol: m0.priceSymbol },
      { symbol: m1.symbol, amount: toAmount(fee1, m1.decimals), priceSymbol: m1.priceSymbol },
    ];
    if ((QUOTE_RANK[m0.symbol] ?? 0) > (QUOTE_RANK[m1.symbol] ?? 0)) {
      legs = legs.reverse();
      fees = fees.reverse();
    }

    out.push({
      id: p.id.toString(),
      protocol: "Uniswap v3",
      pool: `${legs[0].symbol} / ${legs[1].symbol}`,
      tokens: legs,
      fees,
      inRange: p.liquidity > ZERO && state.tick >= p.tickLower && state.tick < p.tickUpper,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Reader
// ---------------------------------------------------------------------------------------------

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

export const evmReader: ChainReader = {
  isValidAddress(address: string): boolean {
    return ADDRESS_RE.test(address.trim());
  },

  normalizeAddress(address: string): string {
    return address.trim().toLowerCase();
  },

  async readWallet(address: string): Promise<WalletSnapshot> {
    const owner = address.trim().toLowerCase();
    if (!ADDRESS_RE.test(owner)) throw new Error(`Not a valid Ethereum address: ${address}`);
    const warnings: string[] = [];

    // One batch: native balance, every curated ERC-20 balance, and the Uniswap v3 NFT count.
    const calls: RpcCall[] = [
      { method: "eth_getBalance", params: [owner, "latest"] },
      ...TOKEN_LIST.map((t) => ethCall(t.address, SEL.balanceOf + encAddress(owner))),
      ethCall(UNISWAP_V3_NPM, SEL.balanceOf + encAddress(owner)),
    ];
    let results: RpcResult[];
    try {
      results = await rpcBatch(calls);
    } catch (e) {
      throw new Error(`Could not read Ethereum wallet: ${errText(e)}`);
    }

    const native = results[0];
    if (!native.ok) throw new Error(`Could not read ETH balance: ${native.error}`);

    const tokens: TokenBalance[] = [];
    const wei = BigInt(native.value);
    if (wei > ZERO) {
      tokens.push({ id: "native", symbol: "ETH", name: "Ether", amount: toAmount(wei, 18), priceSymbol: "ETH" });
    }

    const failed: string[] = [];
    TOKEN_LIST.forEach((t, i) => {
      const raw = decodeUint(results[i + 1]);
      if (raw === null) failed.push(t.symbol);
      else if (raw > ZERO) {
        tokens.push({ id: t.address, symbol: t.symbol, name: t.name, amount: toAmount(raw, t.decimals), priceSymbol: t.priceSymbol });
      }
    });
    if (failed.length > 0) warnings.push(`Could not read ERC-20 balances for ${failed.join(", ")}.`);

    let positions: LpPosition[] = [];
    const nftCount = decodeUint(results[results.length - 1]);
    if (nftCount === null) {
      warnings.push("Uniswap v3 positions could not be read.");
    } else {
      try {
        positions = await readUniswapV3(owner, nftCount, warnings);
      } catch (e) {
        warnings.push(`Uniswap v3 positions could not be read (${errText(e)}).`);
      }
    }

    return { address: owner, tokens, positions, warnings };
  },
};
