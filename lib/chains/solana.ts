/**
 * Solana mainnet reader: native SOL, SPL tokens (Token and Token-2022) and Orca Whirlpool positions,
 * read with plain JSON-RPC against the free public endpoint. No SDKs: account layouts are decoded by
 * hand from the Orca whirlpools program source (programs/whirlpool/src/state/*.rs).
 */
import { createHash } from "node:crypto";

import type { ChainReader, LpPosition, PositionToken, TokenBalance, WalletSnapshot } from "./types";

const RPC_URL = "https://api.mainnet-beta.solana.com";
const RPC_TIMEOUT_MS = 12_000;
const RETRY_DELAYS_MS = [600, 1_500];

const TOKEN_PROGRAM = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_2022_PROGRAM = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const WHIRLPOOL_PROGRAM = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";
const METAPLEX_METADATA_PROGRAM = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
const WSOL_MINT = "So11111111111111111111111111111111111111112";

const MAX_UNKNOWN_TOKENS = 20;
const MAX_POSITIONS = 25;
/** NFTs checked for being Whirlpool positions (one getMultipleAccounts per 100). */
const MAX_NFT_CANDIDATES = 300;
const MAX_ACCOUNTS_PER_CALL = 100;
const TICK_ARRAY_SIZE = 88;

interface KnownToken {
  symbol: string;
  name: string;
  priceSymbol: string | null;
}

/**
 * Curated mints (addresses checked against Jupiter's token list, tickers against Coinbase rates).
 * bSOL, JupSOL and INF have no Coinbase ticker and are priced as SOL: they are worth somewhat more
 * than 1 SOL each, so their USD value is understated.
 */
const KNOWN_MINTS: Record<string, KnownToken> = {
  [WSOL_MINT]: { symbol: "SOL", name: "Wrapped SOL", priceSymbol: "SOL" },
  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v: { symbol: "USDC", name: "USD Coin", priceSymbol: "USDC" },
  Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB: { symbol: "USDT", name: "Tether USD", priceSymbol: "USDT" },
  "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo": { symbol: "PYUSD", name: "PayPal USD", priceSymbol: "PYUSD" },
  JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN: { symbol: "JUP", name: "Jupiter", priceSymbol: "JUP" },
  DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263: { symbol: "BONK", name: "Bonk", priceSymbol: "BONK" },
  EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm: { symbol: "WIF", name: "dogwifhat", priceSymbol: "WIF" },
  jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL: { symbol: "JTO", name: "Jito", priceSymbol: "JTO" },
  HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3: { symbol: "PYTH", name: "Pyth Network", priceSymbol: "PYTH" },
  "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R": { symbol: "RAY", name: "Raydium", priceSymbol: "RAY" },
  orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE: { symbol: "ORCA", name: "Orca", priceSymbol: "ORCA" },
  mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So: { symbol: "mSOL", name: "Marinade staked SOL", priceSymbol: "MSOL" },
  J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn: { symbol: "JitoSOL", name: "Jito Staked SOL", priceSymbol: "JITOSOL" },
  bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1: { symbol: "bSOL", name: "BlazeStake Staked SOL", priceSymbol: "SOL" },
  jupSoLaHXQiZZTSfEWMTRRgpnyFm8f6sZdosWBjx93v: { symbol: "JupSOL", name: "Jupiter Staked SOL", priceSymbol: "SOL" },
  "5oVNBeEEQvYi1cX3ir8Dx5n1P7pdxydbGF2X4TxVusJm": { symbol: "INF", name: "Infinity", priceSymbol: "SOL" },
  "85VBFQZC9TZkfaptBWjvUw7YbZjy52A6mjtPGjstQAmQ": { symbol: "W", name: "Wormhole", priceSymbol: "W" },
  rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof: { symbol: "RENDER", name: "Render", priceSymbol: "RENDER" },
  hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux: { symbol: "HNT", name: "Helium", priceSymbol: "HNT" },
  mb1eu7TzEc71KxDpsmsKoucSSuuoGLv1drys1oP2jh6: { symbol: "MOBILE", name: "Helium Mobile", priceSymbol: "MOBILE" },
  "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr": { symbol: "POPCAT", name: "Popcat", priceSymbol: "POPCAT" },
  "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN": { symbol: "TRUMP", name: "Official Trump", priceSymbol: "TRUMP" },
  KMNo3nJsBXfcpJTVhZcXLW7RmTwTt4GVFE7suUBo9sS: { symbol: "KMNO", name: "Kamino", priceSymbol: "KMNO" },
  DriFtupJYLTosbwoN8koMbEYSx54aFAVLddWsbksjwg7: { symbol: "DRIFT", name: "Drift", priceSymbol: "DRIFT" },
  TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6: { symbol: "TNSR", name: "Tensor", priceSymbol: "TNSR" },
  "2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv": { symbol: "PENGU", name: "Pudgy Penguins", priceSymbol: "PENGU" },
  "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump": { symbol: "FARTCOIN", name: "Fartcoin", priceSymbol: "FARTCOIN" },
  MNDEFzGvMt87ueuHvVU9VcTqsAP5b3fTGPsHuuPA5ey: { symbol: "MNDE", name: "Marinade", priceSymbol: "MNDE" },
  MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5: { symbol: "MEW", name: "cat in a dogs world", priceSymbol: null },
};

// ---------------------------------------------------------------------------------------------
// base58 + PDA derivation
// ---------------------------------------------------------------------------------------------

const B58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const B58_INDEX = new Map([...B58_ALPHABET].map((c, i) => [c, i]));

function base58Decode(input: string): Uint8Array | null {
  let value = BigInt(0);
  for (const char of input) {
    const digit = B58_INDEX.get(char);
    if (digit === undefined) return null;
    value = value * BigInt(58) + BigInt(digit);
  }
  const bytes: number[] = [];
  while (value > BigInt(0)) {
    bytes.unshift(Number(value & BigInt(0xff)));
    value >>= BigInt(8);
  }
  for (const char of input) {
    if (char !== "1") break;
    bytes.unshift(0);
  }
  return Uint8Array.from(bytes);
}

function base58Encode(bytes: Uint8Array): string {
  let value = BigInt(0);
  for (const byte of bytes) value = (value << BigInt(8)) | BigInt(byte);
  let out = "";
  while (value > BigInt(0)) {
    out = B58_ALPHABET[Number(value % BigInt(58))] + out;
    value /= BigInt(58);
  }
  for (const byte of bytes) {
    if (byte !== 0) break;
    out = "1" + out;
  }
  return out;
}

function pubkeyBytes(address: string): Uint8Array {
  const bytes = base58Decode(address);
  if (!bytes || bytes.length !== 32) throw new Error(`Invalid Solana address ${address}`);
  return bytes;
}

// ed25519 field arithmetic, only to tell whether a candidate PDA lies on the curve (it must not).
const P = (BigInt(1) << BigInt(255)) - BigInt(19);
const D = BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555");

function modPow(base: bigint, exp: bigint): bigint {
  let result = BigInt(1);
  let b = ((base % P) + P) % P;
  let e = exp;
  while (e > BigInt(0)) {
    if (e & BigInt(1)) result = (result * b) % P;
    b = (b * b) % P;
    e >>= BigInt(1);
  }
  return result;
}

/** Mirrors curve25519-dalek's CompressedEdwardsY::decompress().is_some(). */
function isOnCurve(bytes: Uint8Array): boolean {
  let y = BigInt(0);
  for (let i = 31; i >= 0; i--) y = (y << BigInt(8)) | BigInt(i === 31 ? bytes[i] & 0x7f : bytes[i]);
  y %= P;
  const y2 = (y * y) % P;
  const u = (y2 - BigInt(1) + P) % P;
  const v = (D * y2 + BigInt(1)) % P;
  const x2 = (u * modPow(v, P - BigInt(2))) % P;
  return x2 === BigInt(0) || modPow(x2, (P - BigInt(1)) / BigInt(2)) === BigInt(1);
}

function findProgramAddress(seeds: Uint8Array[], programId: string): string {
  const program = pubkeyBytes(programId);
  const marker = Buffer.from("ProgramDerivedAddress");
  for (let bump = 255; bump >= 0; bump--) {
    const hash = createHash("sha256");
    for (const seed of seeds) hash.update(seed);
    hash.update(Uint8Array.of(bump));
    hash.update(program);
    hash.update(marker);
    const candidate = new Uint8Array(hash.digest());
    if (!isOnCurve(candidate)) return base58Encode(candidate);
  }
  throw new Error("Unable to find a viable program address");
}

const utf8 = (text: string) => new Uint8Array(Buffer.from(text, "utf8"));

// ---------------------------------------------------------------------------------------------
// JSON-RPC
// ---------------------------------------------------------------------------------------------

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function rpc<T>(method: string, params: unknown[]): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(RPC_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
      signal: AbortSignal.timeout(RPC_TIMEOUT_MS),
      cache: "no-store",
    });
    if ((res.status === 429 || res.status >= 500) && attempt < RETRY_DELAYS_MS.length) {
      await sleep(RETRY_DELAYS_MS[attempt]);
      continue;
    }
    if (!res.ok) throw new Error(`Solana RPC ${method} failed: HTTP ${res.status}`);
    const body = (await res.json()) as { result?: T; error?: { code: number; message: string } };
    if (body.error) {
      // -32429 / -32005 are rate-limit style errors some RPCs return inside a 200 response.
      if ((body.error.code === -32429 || body.error.code === -32005) && attempt < RETRY_DELAYS_MS.length) {
        await sleep(RETRY_DELAYS_MS[attempt]);
        continue;
      }
      throw new Error(`Solana RPC ${method} failed: ${body.error.message}`);
    }
    return body.result as T;
  }
}

interface RawAccount {
  data: [string, string];
  owner: string;
}

/** getMultipleAccounts (base64), chunked by 100; returns decoded data or null per address. */
async function getAccounts(addresses: string[]): Promise<(Buffer | null)[]> {
  const out: (Buffer | null)[] = [];
  for (let i = 0; i < addresses.length; i += MAX_ACCOUNTS_PER_CALL) {
    const chunk = addresses.slice(i, i + MAX_ACCOUNTS_PER_CALL);
    const result = await rpc<{ value: (RawAccount | null)[] }>("getMultipleAccounts", [
      chunk,
      { encoding: "base64", commitment: "confirmed" },
    ]);
    for (const account of result.value) out.push(account ? Buffer.from(account.data[0], "base64") : null);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Binary decoding helpers
// ---------------------------------------------------------------------------------------------

const readPubkey = (buf: Buffer, offset: number) => base58Encode(buf.subarray(offset, offset + 32));
const readU64 = (buf: Buffer, offset: number) => buf.readBigUInt64LE(offset);
const readU128 = (buf: Buffer, offset: number) =>
  buf.readBigUInt64LE(offset) | (buf.readBigUInt64LE(offset + 8) << BigInt(64));

const U128_MASK = (BigInt(1) << BigInt(128)) - BigInt(1);
const U64_MAX = (BigInt(1) << BigInt(64)) - BigInt(1);
const wrappingSub128 = (a: bigint, b: bigint) => (a - b) & U128_MASK;

const anchorDiscriminator = (name: string) =>
  createHash("sha256").update(`account:${name}`).digest().subarray(0, 8);
const POSITION_DISC = anchorDiscriminator("Position");
const WHIRLPOOL_DISC = anchorDiscriminator("Whirlpool");
const FIXED_TICK_ARRAY_DISC = anchorDiscriminator("TickArray");
const DYNAMIC_TICK_ARRAY_DISC = anchorDiscriminator("DynamicTickArray");

const hasDisc = (buf: Buffer, disc: Buffer) => buf.length >= 8 && buf.subarray(0, 8).equals(disc);

const shortMint = (mint: string) => `${mint.slice(0, 4)}…${mint.slice(-4)}`;

// ---------------------------------------------------------------------------------------------
// SPL tokens
// ---------------------------------------------------------------------------------------------

interface ParsedTokenAccount {
  account: {
    data: {
      parsed: {
        info: {
          mint: string;
          tokenAmount: { amount: string; decimals: number; uiAmountString: string };
        };
      };
    };
  };
}

interface Holding {
  mint: string;
  amount: number;
  decimals: number;
}

async function getTokenHoldings(owner: string, programId: string): Promise<ParsedTokenAccount[]> {
  const result = await rpc<{ value: ParsedTokenAccount[] }>("getTokenAccountsByOwner", [
    owner,
    { programId },
    { encoding: "jsonParsed", commitment: "confirmed" },
  ]);
  return result.value;
}

/** Metaplex metadata: key u8, update authority, mint, then borsh strings name and symbol. */
function decodeMetadata(buf: Buffer): { name: string; symbol: string } | null {
  try {
    let offset = 1 + 32 + 32;
    const readString = () => {
      const len = buf.readUInt32LE(offset);
      offset += 4;
      const text = buf.subarray(offset, offset + len).toString("utf8");
      offset += len;
      return text.replace(/\0/g, "").trim();
    };
    const name = readString();
    const symbol = readString();
    return symbol || name ? { name, symbol } : null;
  } catch {
    return null;
  }
}

const metadataAddress = (mint: string) =>
  findProgramAddress([utf8("metadata"), pubkeyBytes(METAPLEX_METADATA_PROGRAM), pubkeyBytes(mint)], METAPLEX_METADATA_PROGRAM);

// ---------------------------------------------------------------------------------------------
// Orca Whirlpools
// ---------------------------------------------------------------------------------------------

interface WhirlpoolPosition {
  address: string;
  whirlpool: string;
  positionMint: string;
  liquidity: bigint;
  tickLower: number;
  tickUpper: number;
  feeGrowthCheckpointA: bigint;
  feeOwedA: bigint;
  feeGrowthCheckpointB: bigint;
  feeOwedB: bigint;
}

/** programs/whirlpool/src/state/position.rs */
function decodePosition(address: string, buf: Buffer): WhirlpoolPosition | null {
  if (!hasDisc(buf, POSITION_DISC) || buf.length < 144) return null;
  return {
    address,
    whirlpool: readPubkey(buf, 8),
    positionMint: readPubkey(buf, 40),
    liquidity: readU128(buf, 72),
    tickLower: buf.readInt32LE(88),
    tickUpper: buf.readInt32LE(92),
    feeGrowthCheckpointA: readU128(buf, 96),
    feeOwedA: readU64(buf, 112),
    feeGrowthCheckpointB: readU128(buf, 120),
    feeOwedB: readU64(buf, 136),
  };
}

interface Whirlpool {
  tickSpacing: number;
  sqrtPrice: bigint;
  tickCurrent: number;
  mintA: string;
  mintB: string;
  feeGrowthGlobalA: bigint;
  feeGrowthGlobalB: bigint;
}

/** programs/whirlpool/src/state/whirlpool.rs */
function decodeWhirlpool(buf: Buffer): Whirlpool | null {
  if (!hasDisc(buf, WHIRLPOOL_DISC) || buf.length < 261) return null;
  return {
    tickSpacing: buf.readUInt16LE(41),
    sqrtPrice: readU128(buf, 65),
    tickCurrent: buf.readInt32LE(81),
    mintA: readPubkey(buf, 101),
    feeGrowthGlobalA: readU128(buf, 165),
    mintB: readPubkey(buf, 181),
    feeGrowthGlobalB: readU128(buf, 245),
  };
}

interface TickFees {
  initialized: boolean;
  feeGrowthOutsideA: bigint;
  feeGrowthOutsideB: bigint;
}

const tickArrayStart = (tick: number, spacing: number) =>
  Math.floor(tick / (spacing * TICK_ARRAY_SIZE)) * spacing * TICK_ARRAY_SIZE;

const tickArrayAddress = (whirlpool: string, start: number) =>
  findProgramAddress([utf8("tick_array"), pubkeyBytes(whirlpool), utf8(String(start))], WHIRLPOOL_PROGRAM);

/**
 * Reads one tick from a fixed (tick_array.rs / fixed_tick_array.rs: 113-byte ticks from offset 12)
 * or dynamic (dynamic_tick_array.rs: bitmap at 44, 1- or 113-byte ticks from offset 60) tick array.
 * Within a tick: initialized flag, liquidity_net i128, liquidity_gross u128, fee_growth_outside_a/b.
 */
function readTick(buf: Buffer, tick: number, spacing: number): TickFees | null {
  const start = buf.readInt32LE(8);
  const index = (tick - start) / spacing;
  if (!Number.isInteger(index) || index < 0 || index >= TICK_ARRAY_SIZE) return null;
  let offset: number;
  if (hasDisc(buf, FIXED_TICK_ARRAY_DISC)) {
    offset = 12 + index * 113;
  } else if (hasDisc(buf, DYNAMIC_TICK_ARRAY_DISC)) {
    const bitmap = readU128(buf, 44);
    offset = 60;
    for (let i = 0; i < index; i++) offset += (bitmap >> BigInt(i)) & BigInt(1) ? 113 : 1;
  } else {
    return null;
  }
  if (buf[offset] !== 1) return { initialized: false, feeGrowthOutsideA: BigInt(0), feeGrowthOutsideB: BigInt(0) };
  return { initialized: true, feeGrowthOutsideA: readU128(buf, offset + 33), feeGrowthOutsideB: readU128(buf, offset + 49) };
}

/** tick_manager.rs next_fee_growths_inside + position_manager.rs next_owed_delta_and_checkpoint. */
function uncollectedFees(position: WhirlpoolPosition, pool: Whirlpool, lower: TickFees, upper: TickFees): [bigint, bigint] {
  const side = (global: bigint, lowerOut: bigint, upperOut: bigint, checkpoint: bigint, owed: bigint) => {
    const below = !lower.initialized
      ? global
      : pool.tickCurrent < position.tickLower
        ? wrappingSub128(global, lowerOut)
        : lowerOut;
    const above = !upper.initialized
      ? BigInt(0)
      : pool.tickCurrent < position.tickUpper
        ? upperOut
        : wrappingSub128(global, upperOut);
    const inside = wrappingSub128(wrappingSub128(global, below), above);
    const delta = (position.liquidity * wrappingSub128(inside, checkpoint)) >> BigInt(64);
    return owed + (delta > U64_MAX ? BigInt(0) : delta);
  };
  return [
    side(pool.feeGrowthGlobalA, lower.feeGrowthOutsideA, upper.feeGrowthOutsideA, position.feeGrowthCheckpointA, position.feeOwedA),
    side(pool.feeGrowthGlobalB, lower.feeGrowthOutsideB, upper.feeGrowthOutsideB, position.feeGrowthCheckpointB, position.feeOwedB),
  ];
}

/** Raw (unscaled) token amounts for a concentrated-liquidity position, in floating point. */
function positionAmounts(liquidity: bigint, pool: Whirlpool, tickLower: number, tickUpper: number): [number, number] {
  const L = Number(liquidity);
  const sqrtLower = Math.pow(1.0001, tickLower / 2);
  const sqrtUpper = Math.pow(1.0001, tickUpper / 2);
  if (pool.tickCurrent < tickLower) return [(L * (sqrtUpper - sqrtLower)) / (sqrtLower * sqrtUpper), 0];
  if (pool.tickCurrent >= tickUpper) return [0, L * (sqrtUpper - sqrtLower)];
  const sqrtPrice = Number(pool.sqrtPrice) / 2 ** 64; // Q64.64
  return [(L * (sqrtUpper - sqrtPrice)) / (sqrtPrice * sqrtUpper), L * (sqrtPrice - sqrtLower)];
}

interface TokenInfo {
  symbol: string;
  priceSymbol: string | null;
}

async function readWhirlpoolPositions(
  nftMints: string[],
  tokenInfo: (mint: string) => TokenInfo | undefined,
  warnings: string[],
): Promise<LpPosition[]> {
  if (nftMints.length === 0) return [];
  const candidates = nftMints.slice(0, MAX_NFT_CANDIDATES);
  if (nftMints.length > candidates.length) {
    warnings.push(`Checked only ${candidates.length} of ${nftMints.length} NFTs for Orca Whirlpool positions.`);
  }

  // 1. Position accounts: PDA ["position", positionMint].
  const positionAddresses = candidates.map((mint) =>
    findProgramAddress([utf8("position"), pubkeyBytes(mint)], WHIRLPOOL_PROGRAM),
  );
  const positionData = await getAccounts(positionAddresses);
  let positions = positionData
    .map((buf, i) => (buf ? decodePosition(positionAddresses[i], buf) : null))
    .filter((p): p is WhirlpoolPosition => p !== null)
    .filter((p) => p.liquidity > BigInt(0) || p.feeOwedA > BigInt(0) || p.feeOwedB > BigInt(0));
  if (positions.length === 0) return [];
  positions.sort((a, b) => (b.liquidity > a.liquidity ? 1 : b.liquidity < a.liquidity ? -1 : 0));
  if (positions.length > MAX_POSITIONS) {
    warnings.push(`Showing the ${MAX_POSITIONS} largest of ${positions.length} Orca Whirlpool positions.`);
    positions = positions.slice(0, MAX_POSITIONS);
  }

  // 2. Whirlpools.
  const poolAddresses = [...new Set(positions.map((p) => p.whirlpool))];
  const poolData = await getAccounts(poolAddresses);
  const pools = new Map<string, Whirlpool>();
  poolData.forEach((buf, i) => {
    const pool = buf ? decodeWhirlpool(buf) : null;
    if (pool) pools.set(poolAddresses[i], pool);
  });

  // 3. Mints (decimals), metadata for unknown pool mints, and the tick arrays holding each position's bounds.
  const mints = [...new Set([...pools.values()].flatMap((p) => [p.mintA, p.mintB]))];
  const unknownMints = mints.filter((m) => !tokenInfo(m));
  const tickArrayKeys = new Map<string, string>(); // "pool:start" -> address
  for (const p of positions) {
    const pool = pools.get(p.whirlpool);
    if (!pool) continue;
    for (const tick of [p.tickLower, p.tickUpper]) {
      const start = tickArrayStart(tick, pool.tickSpacing);
      const key = `${p.whirlpool}:${start}`;
      if (!tickArrayKeys.has(key)) tickArrayKeys.set(key, tickArrayAddress(p.whirlpool, start));
    }
  }
  const tickKeys = [...tickArrayKeys.keys()];
  const extra = await getAccounts([
    ...mints,
    ...unknownMints.map(metadataAddress),
    ...tickKeys.map((k) => tickArrayKeys.get(k) as string),
  ]);
  const decimals = new Map<string, number>();
  mints.forEach((mint, i) => {
    const buf = extra[i];
    if (buf && buf.length >= 45) decimals.set(mint, buf[44]); // spl-token Mint: decimals at offset 44
  });
  const poolSymbols = new Map<string, string>();
  unknownMints.forEach((mint, i) => {
    const buf = extra[mints.length + i];
    const meta = buf ? decodeMetadata(buf) : null;
    if (meta?.symbol) poolSymbols.set(mint, meta.symbol);
  });
  const tickArrays = new Map<string, Buffer>();
  tickKeys.forEach((key, i) => {
    const buf = extra[mints.length + unknownMints.length + i];
    if (buf) tickArrays.set(key, buf);
  });

  const describe = (mint: string): TokenInfo =>
    tokenInfo(mint) ?? { symbol: poolSymbols.get(mint) ?? shortMint(mint), priceSymbol: null };

  const out: LpPosition[] = [];
  let feesUnavailable = 0;
  for (const p of positions) {
    const pool = pools.get(p.whirlpool);
    const decA = pool && decimals.get(pool.mintA);
    const decB = pool && decimals.get(pool.mintB);
    if (!pool || decA === undefined || decB === undefined) {
      warnings.push(`Could not read the pool for Orca position ${shortMint(p.positionMint)}.`);
      continue;
    }
    const a = describe(pool.mintA);
    const b = describe(pool.mintB);
    const [rawA, rawB] = positionAmounts(p.liquidity, pool, p.tickLower, p.tickUpper);
    const tokens: PositionToken[] = [
      { symbol: a.symbol, amount: rawA / 10 ** decA, priceSymbol: a.priceSymbol },
      { symbol: b.symbol, amount: rawB / 10 ** decB, priceSymbol: b.priceSymbol },
    ];

    let feeA = p.feeOwedA;
    let feeB = p.feeOwedB;
    const lowerArray = tickArrays.get(`${p.whirlpool}:${tickArrayStart(p.tickLower, pool.tickSpacing)}`);
    const upperArray = tickArrays.get(`${p.whirlpool}:${tickArrayStart(p.tickUpper, pool.tickSpacing)}`);
    const lower = lowerArray && readTick(lowerArray, p.tickLower, pool.tickSpacing);
    const upper = upperArray && readTick(upperArray, p.tickUpper, pool.tickSpacing);
    if (lower && upper && p.liquidity > BigInt(0)) [feeA, feeB] = uncollectedFees(p, pool, lower, upper);
    else if (p.liquidity > BigInt(0)) feesUnavailable++;
    const fees: PositionToken[] = [
      { symbol: a.symbol, amount: Number(feeA) / 10 ** decA, priceSymbol: a.priceSymbol },
      { symbol: b.symbol, amount: Number(feeB) / 10 ** decB, priceSymbol: b.priceSymbol },
    ];

    out.push({
      id: p.positionMint,
      protocol: "Orca Whirlpools",
      pool: `${a.symbol} / ${b.symbol}`,
      tokens,
      fees,
      inRange: pool.tickCurrent >= p.tickLower && pool.tickCurrent < p.tickUpper,
    });
  }
  if (feesUnavailable > 0) {
    warnings.push(`Uncollected fees for ${feesUnavailable} Orca position(s) only include fees already settled on-chain.`);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Reader
// ---------------------------------------------------------------------------------------------

function isValidAddress(address: string): boolean {
  const trimmed = address.trim();
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(trimmed)) return false;
  return base58Decode(trimmed)?.length === 32;
}

async function readWallet(input: string): Promise<WalletSnapshot> {
  const address = input.trim();
  if (!isValidAddress(address)) throw new Error(`Invalid Solana address: ${address}`);
  const warnings: string[] = [];

  const [balance, legacy, token2022] = await Promise.all([
    rpc<{ value: number }>("getBalance", [address, { commitment: "confirmed" }]),
    getTokenHoldings(address, TOKEN_PROGRAM).catch((err: unknown) => {
      warnings.push(`Could not read SPL token balances: ${errorMessage(err)}`);
      return [];
    }),
    getTokenHoldings(address, TOKEN_2022_PROGRAM).catch((err: unknown) => {
      warnings.push(`Could not read Token-2022 balances: ${errorMessage(err)}`);
      return [];
    }),
  ]);

  const tokens: TokenBalance[] = [];
  if (balance.value > 0) {
    tokens.push({ id: "native:SOL", symbol: "SOL", name: "Solana", amount: balance.value / 1e9, priceSymbol: "SOL" });
  }

  // Aggregate per mint; set aside NFTs (decimals 0, amount 1) as possible LP position NFTs.
  const holdings = new Map<string, Holding>();
  const nftMints: string[] = [];
  for (const entry of [...legacy, ...token2022]) {
    const info = entry.account?.data?.parsed?.info;
    if (!info?.tokenAmount) continue;
    const { amount, decimals } = info.tokenAmount;
    if (amount === "0") continue;
    if (decimals === 0 && amount === "1") {
      nftMints.push(info.mint);
      continue;
    }
    const value = Number(amount) / 10 ** decimals;
    const existing = holdings.get(info.mint);
    if (existing) existing.amount += value;
    else holdings.set(info.mint, { mint: info.mint, amount: value, decimals });
  }

  const known: Holding[] = [];
  let unknown: Holding[] = [];
  for (const h of holdings.values()) (KNOWN_MINTS[h.mint] ? known : unknown).push(h);
  unknown.sort((a, b) => b.amount - a.amount);
  if (unknown.length > MAX_UNKNOWN_TOKENS) {
    warnings.push(`Hid ${unknown.length - MAX_UNKNOWN_TOKENS} unrecognised tokens (showing the ${MAX_UNKNOWN_TOKENS} largest balances).`);
    unknown = unknown.slice(0, MAX_UNKNOWN_TOKENS);
  }

  const tokenInfo = (mint: string): TokenInfo | undefined => KNOWN_MINTS[mint];

  const [unknownMeta, positions] = await Promise.all([
    unknown.length === 0
      ? Promise.resolve([] as (Buffer | null)[])
      : getAccounts(unknown.map((h) => metadataAddress(h.mint))).catch(() => {
          warnings.push("Could not load names for unrecognised tokens.");
          return unknown.map(() => null);
        }),
    readWhirlpoolPositions(nftMints, tokenInfo, warnings).catch((err: unknown) => {
      warnings.push(`Could not read Orca Whirlpool positions: ${errorMessage(err)}`);
      return [] as LpPosition[];
    }),
  ]);

  for (const h of known) {
    const meta = KNOWN_MINTS[h.mint];
    tokens.push({ id: h.mint, symbol: meta.symbol, name: meta.name, amount: h.amount, priceSymbol: meta.priceSymbol });
  }
  unknown.forEach((h, i) => {
    const buf = unknownMeta[i];
    const meta = buf ? decodeMetadata(buf) : null;
    tokens.push({
      id: h.mint,
      symbol: meta?.symbol || shortMint(h.mint),
      name: meta?.name || `Unknown token ${shortMint(h.mint)}`,
      amount: h.amount,
      priceSymbol: null,
    });
  });

  return { address, tokens, positions, warnings };
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

export const solanaReader: ChainReader = {
  isValidAddress,
  normalizeAddress: (address: string) => address.trim(),
  readWallet,
};
