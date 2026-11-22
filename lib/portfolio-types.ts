/** Shapes the server actions return to the dashboard. Safe to import from client components. */

export interface WalletRow {
  id: number;
  address: string;
  label: string | null;
  /** USD value of tokens plus LP positions that Coinbase can price. */
  value: number;
  status: "ok" | "error";
  error?: string;
  warnings: string[];
}

export interface HoldingRow extends Record<string, unknown> {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  priceSymbol: string | null;
  price: number | null;
  value: number | null;
  change: number | null;
}

export interface PositionSide {
  symbol: string;
  amount: number;
  value: number | null;
}

export interface PositionRow extends Record<string, unknown> {
  id: string;
  walletId: number;
  wallet: string;
  protocol: string;
  pool: string;
  tokens: PositionSide[];
  fees: PositionSide[];
  inRange: boolean | null;
  value: number | null;
}

export interface PortfolioView {
  wallets: WalletRow[];
  holdings: HoldingRow[];
  positions: PositionRow[];
  tokensValue: number;
  positionsValue: number;
  total: number;
  /** Value-weighted 24h change of priced holdings and LP tokens, in percent. */
  change24h: number | null;
  /** Fixed amounts per Coinbase ticker, used to chart value over time. */
  exposure: { priceSymbol: string; amount: number }[];
  pricedAt: string;
}

export type TrackResult = { ok: true } | { ok: false; error: string };
