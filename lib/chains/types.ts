/**
 * Contract every chain reader implements. Readers only talk to free, keyless public endpoints
 * and never price anything themselves: they report amounts plus the Coinbase ticker to price them
 * with (`priceSymbol`), and lib/prices.ts turns those into USD.
 */

/** A fungible balance held directly by the wallet. Amounts are already scaled by decimals. */
export interface TokenBalance {
  /** Stable id within the chain, e.g. a mint, contract address or Sui coin type. */
  id: string;
  symbol: string;
  name: string;
  amount: number;
  /**
   * Coinbase ticker used for USD pricing (e.g. "ETH" for WETH, "USDC" for any USDC).
   * null when Coinbase has no price for it; the UI shows the balance without a value.
   */
  priceSymbol: string | null;
}

/** One side of a liquidity position, as the amount the wallet would get back if it withdrew now. */
export interface PositionToken {
  symbol: string;
  amount: number;
  priceSymbol: string | null;
}

/** A concentrated or standard liquidity-pool position owned by the wallet. */
export interface LpPosition {
  /** Stable id, e.g. the position NFT id / mint / object id. */
  id: string;
  /** Human protocol name, e.g. "Uniswap v3", "Orca Whirlpools", "Cetus". */
  protocol: string;
  /** Pair label, e.g. "ETH / USDC". */
  pool: string;
  tokens: PositionToken[];
  /** Uncollected fees, when the reader can compute them cheaply; otherwise omitted. */
  fees?: PositionToken[];
  /** For concentrated liquidity: whether the current price is inside the position's range. */
  inRange?: boolean;
}

export interface WalletSnapshot {
  address: string;
  tokens: TokenBalance[];
  positions: LpPosition[];
  /** Non-fatal problems (an LP source timed out, a token had no metadata…) shown to the user. */
  warnings: string[];
}

export interface ChainReader {
  /** Cheap syntactic check used before saving an address. */
  isValidAddress(address: string): boolean;
  /** Canonical form stored in the database (e.g. lowercase 0x for EVM, as-is base58 for Solana). */
  normalizeAddress(address: string): string;
  /** Reads balances and LP positions. Throws only when the wallet cannot be read at all. */
  readWallet(address: string): Promise<WalletSnapshot>;
}
