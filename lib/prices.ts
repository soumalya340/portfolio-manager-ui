import "server-only";

/**
 * USD prices from Coinbase's free, keyless public endpoints:
 * - spot:   GET api.coinbase.com/v2/exchange-rates?currency=USD (one call covers every listed asset)
 * - 24h:    GET api.exchange.coinbase.com/products/{SYMBOL}-USD/stats
 * - history GET api.exchange.coinbase.com/products/{SYMBOL}-USD/candles
 */

const RATES_URL = "https://api.coinbase.com/v2/exchange-rates?currency=USD";
const EXCHANGE = "https://api.exchange.coinbase.com/products";
const TIMEOUT = AbortSignal.timeout.bind(AbortSignal);

/** Coinbase has no X-USD market for USD stablecoins themselves; treat them as flat at their spot price. */
const FLAT = new Set(["USDC", "USD"]);

let spotCache: { at: number; prices: Map<string, number> } | null = null;
const SPOT_TTL = 60_000;

export async function getSpotPrices(): Promise<Map<string, number>> {
  if (spotCache && Date.now() - spotCache.at < SPOT_TTL) return spotCache.prices;
  const response = await fetch(RATES_URL, { signal: TIMEOUT(8000), cache: "no-store" });
  if (!response.ok) throw new Error(`Coinbase prices returned ${response.status}`);
  const body = (await response.json()) as { data: { rates: Record<string, string> } };
  const prices = new Map<string, number>();
  for (const [symbol, rate] of Object.entries(body.data.rates)) {
    const unitsPerDollar = Number(rate);
    if (unitsPerDollar > 0) prices.set(symbol.toUpperCase(), 1 / unitsPerDollar);
  }
  spotCache = { at: Date.now(), prices };
  return prices;
}

const changeCache = new Map<string, { at: number; change: number | null }>();
const CHANGE_TTL = 5 * 60_000;

/** Percent change over the last 24 hours, or null when Coinbase has no USD market for the symbol. */
export async function get24hChanges(symbols: string[]): Promise<Map<string, number | null>> {
  const unique = [...new Set(symbols.map((s) => s.toUpperCase()))];
  const entries = await Promise.all(
    unique.map(async (symbol): Promise<[string, number | null]> => {
      if (FLAT.has(symbol)) return [symbol, 0];
      const cached = changeCache.get(symbol);
      if (cached && Date.now() - cached.at < CHANGE_TTL) return [symbol, cached.change];
      let change: number | null = null;
      try {
        const response = await fetch(`${EXCHANGE}/${symbol}-USD/stats`, { signal: TIMEOUT(6000), cache: "no-store" });
        if (response.ok) {
          const stats = (await response.json()) as { open: string; last: string };
          const open = Number(stats.open);
          const last = Number(stats.last);
          if (open > 0 && Number.isFinite(last)) change = ((last - open) / open) * 100;
        }
      } catch {
        change = null;
      }
      changeCache.set(symbol, { at: Date.now(), change });
      return [symbol, change];
    }),
  );
  return new Map(entries);
}

export type Period = "24H" | "7D" | "30D" | "90D" | "1Y";

/** Candle size and how far back each chart period reaches. Coinbase returns at most 300 candles per call. */
const PERIODS: Record<Period, { granularity: number; span: number }> = {
  "24H": { granularity: 3600, span: 24 * 3600 },
  "7D": { granularity: 21600, span: 7 * 86400 },
  "30D": { granularity: 86400, span: 30 * 86400 },
  "90D": { granularity: 86400, span: 90 * 86400 },
  "1Y": { granularity: 86400, span: 365 * 86400 },
};

type Candle = [time: number, low: number, high: number, open: number, close: number, volume: number];

const historyCache = new Map<string, { at: number; closes: Map<number, number> | null }>();
const HISTORY_TTL = 10 * 60_000;

async function closesFor(symbol: string, period: Period): Promise<Map<number, number> | null> {
  const key = `${symbol}:${period}`;
  const cached = historyCache.get(key);
  if (cached && Date.now() - cached.at < HISTORY_TTL) return cached.closes;

  const { granularity, span } = PERIODS[period];
  const end = Math.floor(Date.now() / 1000 / granularity) * granularity;
  const start = end - span;
  const windows: [number, number][] = [];
  for (let from = start; from < end; from += granularity * 300) {
    windows.push([from, Math.min(from + granularity * 300, end)]);
  }

  let closes: Map<number, number> | null = new Map();
  try {
    for (const [from, to] of windows) {
      const url = `${EXCHANGE}/${symbol}-USD/candles?granularity=${granularity}&start=${new Date(from * 1000).toISOString()}&end=${new Date(to * 1000).toISOString()}`;
      const response = await fetch(url, { signal: TIMEOUT(8000), cache: "no-store" });
      if (!response.ok) {
        closes = null;
        break;
      }
      for (const candle of (await response.json()) as Candle[]) closes.set(candle[0], candle[4]);
    }
  } catch {
    closes = null;
  }
  historyCache.set(key, { at: Date.now(), closes });
  return closes;
}

export interface HistoryPoint {
  /** Unix seconds at the start of the candle. */
  time: number;
  value: number;
}

/**
 * Value over time of fixed amounts at historical Coinbase prices. Assets without a Coinbase market
 * (USDC, or a failed request) are held flat at their current spot price so totals stay comparable.
 */
export async function getValueHistory(amounts: { priceSymbol: string; amount: number }[], period: Period): Promise<HistoryPoint[]> {
  const bySymbol = new Map<string, number>();
  for (const { priceSymbol, amount } of amounts) {
    const symbol = priceSymbol.toUpperCase();
    bySymbol.set(symbol, (bySymbol.get(symbol) ?? 0) + amount);
  }
  if (bySymbol.size === 0) return [];

  const spot = await getSpotPrices();
  const series = await Promise.all(
    [...bySymbol].map(async ([symbol, amount]) => ({
      amount,
      spot: spot.get(symbol) ?? 0,
      closes: FLAT.has(symbol) ? null : await closesFor(symbol, period),
    })),
  );

  const times = new Set<number>();
  for (const { closes } of series) closes?.forEach((_, time) => times.add(time));
  const sorted = [...times].sort((a, b) => a - b);
  if (sorted.length === 0) return [];

  // Carry the last known close forward so a missing candle doesn't drop an asset out of the total.
  // Before an asset's first candle, use its earliest close (or spot, when it has no history at all).
  const lastClose = series.map(({ closes, spot: price }) => {
    if (!closes || closes.size === 0) return price;
    const earliest = Math.min(...closes.keys());
    return closes.get(earliest) ?? price;
  });
  return sorted.map((time) => {
    let value = 0;
    series.forEach(({ amount, closes }, index) => {
      const close = closes?.get(time);
      if (close !== undefined) lastClose[index] = close;
      value += amount * lastClose[index];
    });
    return { time, value };
  });
}
