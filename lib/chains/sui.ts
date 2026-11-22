/**
 * Sui mainnet reader. Public fullnode JSON-RPC is shut down, so everything goes through the
 * public GraphQL service. That service allows at most 21 "rich" lookups per request (each
 * coinMetadata alias costs one or two), so metadata is fetched in small aliased batches.
 */
import type { ChainReader, LpPosition, PositionToken, TokenBalance, WalletSnapshot } from "./types";

const GRAPHQL_URL = "https://graphql.mainnet.sui.io/graphql";
const TIMEOUT_MS = 15_000;
/** Max page size the service accepts. */
const PAGE_SIZE = 50;
/** Up to 200 coin types per wallet. */
const MAX_BALANCE_PAGES = 4;
/** Unknown (unpriced) coins we look metadata up for, largest raw balances first. */
const MAX_METADATA_LOOKUPS = 40;
/** Unknown coins we show; Sui wallets collect lots of airdropped spam coins. */
const MAX_UNKNOWN_COINS = 20;
const METADATA_BATCH = 8;
const POOL_BATCH = 20;
const MAX_POSITIONS = 25;

/** Cetus CLMM types keep the original package id across upgrades. */
const CETUS_PACKAGE = "0x1eabed72c53feb3805120a081dc15963c204dc8d091542592abaf7a35689b2fb";
const CETUS_POSITION_TYPE = `${CETUS_PACKAGE}::position::Position`;

interface KnownCoin {
  symbol: string;
  name: string;
  decimals: number;
  priceSymbol: string | null;
}

/**
 * Well-known coin types (verified on mainnet). priceSymbol is checked against Coinbase's
 * exchange-rates keys; CETUS and NS are not listed there, so they stay unpriced.
 */
const KNOWN_COINS: Record<string, KnownCoin> = {
  "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI": {
    symbol: "SUI", name: "Sui", decimals: 9, priceSymbol: "SUI",
  },
  // Native (Circle) USDC.
  "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC": {
    symbol: "USDC", name: "USDC", decimals: 6, priceSymbol: "USDC",
  },
  // Wormhole USDC (from Ethereum, Solana, Arbitrum).
  "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN": {
    symbol: "wUSDC", name: "Wormhole USDC", decimals: 6, priceSymbol: "USDC",
  },
  "0xb231fcda8bbddb31f2ef02e6161444aec64a514e2c89279584ac9806ce9cf037::coin::COIN": {
    symbol: "USDCsol", name: "Wormhole USDC (Solana)", decimals: 6, priceSymbol: "USDC",
  },
  "0xe32d3ebafa42e6011b87ef1087bbc6053b499bf6f095807b9013aff5a6ecd7bb::coin::COIN": {
    symbol: "USDCarb", name: "Wormhole USDC (Arbitrum)", decimals: 6, priceSymbol: "USDC",
  },
  // Wormhole USDT and Sui Bridge USDT.
  "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN": {
    symbol: "wUSDT", name: "Wormhole USDT", decimals: 6, priceSymbol: "USDT",
  },
  "0x375f70cf2ae4c00bf37117d0c85a2c71545e6ee05c4a5c7d282cd66a4504b068::usdt::USDT": {
    symbol: "suiUSDT", name: "Tether (Sui Bridge)", decimals: 6, priceSymbol: "USDT",
  },
  // ETH: Wormhole WETH and Sui Bridge ETH.
  "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN": {
    symbol: "WETH", name: "Wormhole WETH", decimals: 8, priceSymbol: "ETH",
  },
  "0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH": {
    symbol: "suiETH", name: "ETH (Sui Bridge)", decimals: 8, priceSymbol: "ETH",
  },
  // BTC wrappers.
  "0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN": {
    symbol: "WBTC", name: "Wormhole WBTC", decimals: 8, priceSymbol: "BTC",
  },
  "0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC": {
    symbol: "wBTC", name: "Wrapped Bitcoin", decimals: 8, priceSymbol: "BTC",
  },
  "0x876a4b7bce8aeaef60464c11f4026903e9afacab79b9b142686158aa86560b50::xbtc::XBTC": {
    symbol: "xBTC", name: "OKX Wrapped BTC", decimals: 8, priceSymbol: "BTC",
  },
  // Wormhole SOL and BNB.
  "0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8::coin::COIN": {
    symbol: "WSOL", name: "Wormhole SOL", decimals: 8, priceSymbol: "SOL",
  },
  "0xb848cce11ef3a8f62eccea6eb5b35a12c4c2b1ee1af7755d02d7bd6218e8226f::coin::COIN": {
    symbol: "WBNB", name: "Wormhole BNB", decimals: 8, priceSymbol: "BNB",
  },
  // Sui ecosystem tokens.
  "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP": {
    symbol: "DEEP", name: "DeepBook Token", decimals: 6, priceSymbol: "DEEP",
  },
  "0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59::wal::WAL": {
    symbol: "WAL", name: "Walrus", decimals: 9, priceSymbol: "WAL",
  },
  "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS": {
    symbol: "CETUS", name: "Cetus Token", decimals: 9, priceSymbol: null,
  },
  "0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS": {
    symbol: "NS", name: "SuiNS Token", decimals: 6, priceSymbol: null,
  },
};

// ---------------------------------------------------------------------------------------------
// GraphQL plumbing

interface GqlError {
  message: string;
  path?: (string | number)[];
}

interface GqlResponse<T> {
  data?: T | null;
  errors?: GqlError[];
}

/** Posts one query. Throws on transport errors or when no data came back at all. */
async function gql<T>(query: string, variables: Record<string, unknown> = {}): Promise<GqlResponse<T>> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Sui GraphQL HTTP ${res.status}`);
  const body = (await res.json()) as GqlResponse<T>;
  if (!body.data) throw new Error(body.errors?.[0]?.message ?? "Sui GraphQL returned no data");
  return body;
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.name === "TimeoutError" ? "request timed out" : err.message;
  return String(err);
}

// ---------------------------------------------------------------------------------------------
// Addresses and coin types

const ADDRESS_RE = /^0x[0-9a-fA-F]{1,64}$/;

function normalizeAddress(address: string): string {
  const hex = address.trim().toLowerCase().replace(/^0x/, "");
  return `0x${hex.padStart(64, "0")}`;
}

/** Canonical coin type: full-width lowercase package address with 0x (generic args left as-is). */
function normalizeCoinType(coinType: string): string {
  const sep = coinType.indexOf("::");
  if (sep < 0) return coinType;
  return normalizeAddress(coinType.slice(0, sep)) + coinType.slice(sep);
}

/** Fallback symbol from the type name, e.g. "0x…::blue::BLUE" -> "BLUE". */
function typeSymbol(coinType: string): string {
  const parts = coinType.split("::");
  return parts[parts.length - 1] || coinType;
}

// ---------------------------------------------------------------------------------------------
// Coin balances and metadata

interface RawBalance {
  coinType: string;
  raw: bigint;
}

interface BalancesPage {
  address: {
    balances: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: { coinType: { repr: string }; totalBalance: string | null }[];
    } | null;
  } | null;
}

const BALANCES_QUERY = `query($addr: SuiAddress!, $after: String) {
  address(address: $addr) {
    balances(first: ${PAGE_SIZE}, after: $after) {
      pageInfo { hasNextPage endCursor }
      nodes { coinType { repr } totalBalance }
    }
  }
}`;

/** Reads every non-zero balance (capped). Throws if the first page can't be read. */
async function readBalances(address: string, warnings: string[]): Promise<RawBalance[]> {
  const out: RawBalance[] = [];
  let after: string | null = null;
  for (let page = 0; page < MAX_BALANCE_PAGES; page++) {
    let conn: NonNullable<NonNullable<BalancesPage["address"]>["balances"]>;
    try {
      const res: GqlResponse<BalancesPage> = await gql<BalancesPage>(BALANCES_QUERY, { addr: address, after });
      const balances = res.data?.address?.balances;
      if (!balances) throw new Error(res.errors?.[0]?.message ?? "no balances returned");
      conn = balances;
    } catch (err) {
      if (page === 0) throw new Error(`Couldn't read Sui balances: ${errorMessage(err)}`);
      warnings.push(`Some Sui balances could not be read: ${errorMessage(err)}`);
      break;
    }
    for (const node of conn.nodes) {
      const raw = BigInt(node.totalBalance ?? "0");
      if (raw > BigInt(0)) out.push({ coinType: normalizeCoinType(node.coinType.repr), raw });
    }
    if (!conn.pageInfo.hasNextPage || !conn.pageInfo.endCursor) return out;
    after = conn.pageInfo.endCursor;
  }
  if (after) warnings.push(`This wallet holds more than ${MAX_BALANCE_PAGES * PAGE_SIZE} coin types; only the first ones were read.`);
  return out;
}

interface CoinMeta {
  symbol: string;
  name: string;
  decimals: number;
}

type MetaResult = Record<string, { decimals: number | null; symbol: string | null; name: string | null } | null>;

/** One aliased request; returns found metadata plus the types the service refused (rate-limited). */
async function fetchMetadataBatch(types: string[]): Promise<{ found: Map<string, CoinMeta>; retry: string[] }> {
  const vars = types.map((_, i) => `$t${i}: String!`).join(", ");
  const fields = types.map((_, i) => `c${i}: coinMetadata(coinType: $t${i}) { decimals symbol name }`).join("\n");
  const variables = Object.fromEntries(types.map((t, i) => [`t${i}`, t]));
  const res = await gql<MetaResult>(`query(${vars}) {\n${fields}\n}`, variables);
  const errored = new Set((res.errors ?? []).map((e) => e.path?.[0]).filter((p): p is string => typeof p === "string"));
  const found = new Map<string, CoinMeta>();
  const retry: string[] = [];
  types.forEach((type, i) => {
    const meta = res.data?.[`c${i}`];
    if (meta && typeof meta.decimals === "number") {
      found.set(type, {
        decimals: meta.decimals,
        symbol: meta.symbol?.trim() || typeSymbol(type),
        name: meta.name?.trim() || meta.symbol?.trim() || typeSymbol(type),
      });
    } else if (errored.has(`c${i}`)) {
      retry.push(type);
    }
  });
  return { found, retry };
}

/** Metadata for the given coin types; known coins are answered locally without a request. */
async function readMetadata(types: string[], warnings: string[]): Promise<Map<string, CoinMeta>> {
  const out = new Map<string, CoinMeta>();
  const pending: string[] = [];
  for (const type of new Set(types)) {
    const known = KNOWN_COINS[type];
    if (known) out.set(type, known);
    else pending.push(type);
  }
  let queue = pending;
  // Two rounds: refused aliases (rich-query limit) are retried once in smaller batches.
  for (const batchSize of [METADATA_BATCH, METADATA_BATCH / 2]) {
    if (queue.length === 0) break;
    const batches: string[][] = [];
    for (let i = 0; i < queue.length; i += batchSize) batches.push(queue.slice(i, i + batchSize));
    const results = await Promise.allSettled(batches.map(fetchMetadataBatch));
    const next: string[] = [];
    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        r.value.found.forEach((meta, type) => out.set(type, meta));
        next.push(...r.value.retry);
      } else {
        next.push(...batches[i]);
      }
    });
    queue = next;
  }
  const failed = queue.length;
  if (failed > 0) warnings.push(`Couldn't load token details for ${failed} Sui coin type${failed === 1 ? "" : "s"}.`);
  return out;
}

/**
 * Airdropped scam coins advertise a claim site in their symbol or name
 * (e.g. "$ rcetus.cc - Cetus Reward", "aSUI (Bridge on: suibridgev2.com)").
 */
const SPAM_RE = /https?:|www\.|\.(com|cc|io|net|org|xyz|app|fi|site|top|live|pro|vip|fun|me)\b|claim|airdrop|visit|^\s*\$/i;

function looksLikeSpam(meta: CoinMeta): boolean {
  return SPAM_RE.test(meta.symbol) || SPAM_RE.test(meta.name);
}

function scale(raw: bigint | number, decimals: number): number {
  return Number(raw) / 10 ** decimals;
}

// ---------------------------------------------------------------------------------------------
// Cetus CLMM positions

interface CetusPositionJson {
  pool: string;
  coin_type_a: string;
  coin_type_b: string;
  liquidity: string;
  tick_lower_index: { bits: number | string };
  tick_upper_index: { bits: number | string };
}

interface CetusPoolJson {
  current_sqrt_price: string;
  current_tick_index: { bits: number | string };
}

interface OwnedPosition {
  id: string;
  json: CetusPositionJson;
}

interface PositionsResult {
  address: {
    objects: {
      pageInfo: { hasNextPage: boolean };
      nodes: { address: string; contents: { json: CetusPositionJson | null } | null }[];
    } | null;
  } | null;
}

const POSITIONS_QUERY = `query($addr: SuiAddress!, $type: String!) {
  address(address: $addr) {
    objects(first: ${PAGE_SIZE}, filter: { type: $type }) {
      pageInfo { hasNextPage }
      nodes { address contents { json } }
    }
  }
}`;

async function readCetusPositions(address: string, warnings: string[]): Promise<OwnedPosition[]> {
  const res = await gql<PositionsResult>(POSITIONS_QUERY, { addr: address, type: CETUS_POSITION_TYPE });
  const conn = res.data?.address?.objects;
  if (!conn) throw new Error(res.errors?.[0]?.message ?? "no objects returned");
  const open = conn.nodes
    .filter((n): n is { address: string; contents: { json: CetusPositionJson } } => !!n.contents?.json)
    .filter((n) => n.contents.json.liquidity !== "0")
    .map((n) => ({ id: n.address, json: n.contents.json }));
  if (open.length > MAX_POSITIONS || conn.pageInfo.hasNextPage) {
    warnings.push(`Showing the first ${Math.min(open.length, MAX_POSITIONS)} Cetus positions; this wallet may have more.`);
  }
  return open.slice(0, MAX_POSITIONS);
}

interface PoolsResult {
  multiGetObjects: ({ address: string; asMoveObject: { contents: { json: CetusPoolJson | null } | null } | null } | null)[];
}

const POOLS_QUERY = `query($keys: [ObjectKey!]!) {
  multiGetObjects(keys: $keys) { address asMoveObject { contents { json } } }
}`;

async function readPools(ids: string[]): Promise<Map<string, CetusPoolJson>> {
  const batches: string[][] = [];
  for (let i = 0; i < ids.length; i += POOL_BATCH) batches.push(ids.slice(i, i + POOL_BATCH));
  const results = await Promise.all(
    batches.map((batch) => gql<PoolsResult>(POOLS_QUERY, { keys: batch.map((address) => ({ address })) })),
  );
  const out = new Map<string, CetusPoolJson>();
  for (const res of results) {
    for (const obj of res.data?.multiGetObjects ?? []) {
      const json = obj?.asMoveObject?.contents?.json;
      if (obj && json?.current_sqrt_price) out.set(normalizeAddress(obj.address), json);
    }
  }
  return out;
}

/** Move I32 is stored as u32 bits. */
function i32(bits: number | string): number {
  const n = Number(bits);
  return n >= 2 ** 31 ? n - 2 ** 32 : n;
}

/** sqrt(price) at a tick, as a plain float (price = raw B per raw A). */
function sqrtPriceAtTick(tick: number): number {
  return Math.pow(1.0001, tick / 2);
}

/**
 * Raw token amounts for `liquidity` in [lower, upper) at the current price, same branches as
 * Cetus's ClmmPoolUtil.getCoinAmountFromLiquidity.
 */
function clmmAmounts(liquidity: number, sqrtCurrent: number, tickCurrent: number, tickLower: number, tickUpper: number) {
  const sqrtLower = sqrtPriceAtTick(tickLower);
  const sqrtUpper = sqrtPriceAtTick(tickUpper);
  if (tickCurrent < tickLower) {
    return { a: liquidity * (1 / sqrtLower - 1 / sqrtUpper), b: 0, inRange: false };
  }
  if (tickCurrent >= tickUpper) {
    return { a: 0, b: liquidity * (sqrtUpper - sqrtLower), inRange: false };
  }
  return {
    a: liquidity * (1 / sqrtCurrent - 1 / sqrtUpper),
    b: liquidity * (sqrtCurrent - sqrtLower),
    inRange: true,
  };
}

function positionToken(coinType: string, rawAmount: number, meta: CoinMeta | undefined): PositionToken | null {
  if (!meta) return null;
  return {
    symbol: meta.symbol,
    amount: rawAmount / 10 ** meta.decimals,
    priceSymbol: KNOWN_COINS[coinType]?.priceSymbol ?? null,
  };
}

function buildPositions(
  owned: OwnedPosition[],
  pools: Map<string, CetusPoolJson>,
  metadata: Map<string, CoinMeta>,
  warnings: string[],
): LpPosition[] {
  const out: LpPosition[] = [];
  let skipped = 0;
  for (const { id, json } of owned) {
    const pool = pools.get(normalizeAddress(json.pool));
    const typeA = normalizeCoinType(`0x${json.coin_type_a.replace(/^0x/, "")}`);
    const typeB = normalizeCoinType(`0x${json.coin_type_b.replace(/^0x/, "")}`);
    if (!pool) {
      skipped++;
      continue;
    }
    const sqrtCurrent = Number(BigInt(pool.current_sqrt_price)) / 2 ** 64;
    const { a, b, inRange } = clmmAmounts(
      Number(json.liquidity),
      sqrtCurrent,
      i32(pool.current_tick_index.bits),
      i32(json.tick_lower_index.bits),
      i32(json.tick_upper_index.bits),
    );
    const tokenA = positionToken(typeA, a, metadata.get(typeA));
    const tokenB = positionToken(typeB, b, metadata.get(typeB));
    if (!tokenA || !tokenB) {
      skipped++;
      continue;
    }
    out.push({
      id,
      protocol: "Cetus",
      pool: `${tokenA.symbol} / ${tokenB.symbol}`,
      tokens: [tokenA, tokenB],
      inRange,
    });
  }
  if (skipped > 0) warnings.push(`Couldn't value ${skipped} Cetus position${skipped === 1 ? "" : "s"}.`);
  return out;
}

// ---------------------------------------------------------------------------------------------
// Reader

async function readWallet(input: string): Promise<WalletSnapshot> {
  const address = normalizeAddress(input);
  const warnings: string[] = [];

  const positionWarnings: string[] = [];
  const [balances, ownedPositions] = await Promise.all([
    readBalances(address, warnings),
    readCetusPositions(address, positionWarnings).catch((err) => {
      positionWarnings.push(`Couldn't read Cetus positions: ${errorMessage(err)}`);
      return [] as OwnedPosition[];
    }),
  ]);

  // Unknown coins: look up the largest raw balances only, to keep spam from costing requests.
  const unknown = balances
    .filter((b) => !KNOWN_COINS[b.coinType])
    .sort((x, y) => (y.raw > x.raw ? 1 : y.raw < x.raw ? -1 : 0));
  const lookedUp = unknown.slice(0, MAX_METADATA_LOOKUPS);
  const positionTypes = ownedPositions.flatMap((p) => [
    normalizeCoinType(`0x${p.json.coin_type_a.replace(/^0x/, "")}`),
    normalizeCoinType(`0x${p.json.coin_type_b.replace(/^0x/, "")}`),
  ]);
  const poolIds = [...new Set(ownedPositions.map((p) => normalizeAddress(p.json.pool)))];

  const [metadata, pools] = await Promise.all([
    readMetadata([...balances.filter((b) => KNOWN_COINS[b.coinType]).map((b) => b.coinType), ...lookedUp.map((b) => b.coinType), ...positionTypes], warnings),
    poolIds.length === 0
      ? Promise.resolve(new Map<string, CetusPoolJson>())
      : readPools(poolIds).catch((err) => {
          positionWarnings.push(`Couldn't read Cetus pools: ${errorMessage(err)}`);
          return new Map<string, CetusPoolJson>();
        }),
  ]);

  const known: TokenBalance[] = [];
  const others: TokenBalance[] = [];
  for (const b of [...balances.filter((x) => KNOWN_COINS[x.coinType]), ...lookedUp]) {
    const meta = metadata.get(b.coinType);
    if (!meta) continue;
    if (!KNOWN_COINS[b.coinType] && looksLikeSpam(meta)) continue;
    const token: TokenBalance = {
      id: b.coinType,
      symbol: meta.symbol,
      name: meta.name,
      amount: scale(b.raw, meta.decimals),
      priceSymbol: KNOWN_COINS[b.coinType]?.priceSymbol ?? null,
    };
    (KNOWN_COINS[b.coinType] ? known : others).push(token);
  }
  others.sort((x, y) => y.amount - x.amount);
  const hidden = unknown.length - Math.min(others.length, MAX_UNKNOWN_COINS);
  const shownOthers = others.slice(0, MAX_UNKNOWN_COINS);
  if (hidden > 0) {
    warnings.push(`Hid ${hidden} other Sui coin type${hidden === 1 ? "" : "s"} (likely airdrops/spam).`);
  }

  const positions = buildPositions(ownedPositions, pools, metadata, positionWarnings);
  warnings.push(...positionWarnings);

  return {
    address,
    tokens: [...known.sort((x, y) => y.amount - x.amount), ...shownOthers],
    positions,
    warnings,
  };
}

export const suiReader: ChainReader = {
  isValidAddress: (address) => ADDRESS_RE.test(address.trim()),
  normalizeAddress,
  readWallet,
};
