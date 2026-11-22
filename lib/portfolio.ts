import "server-only";
import type { Chain } from "@/app/_portfolio/data";
import { readers } from "./chains";
import type { PositionToken, WalletSnapshot } from "./chains/types";
import type { TrackedWallet } from "./db";
import { get24hChanges, getSpotPrices } from "./prices";
import type { HoldingRow, PortfolioView, PositionRow, PositionSide, WalletRow } from "./portfolio-types";

const shorten = (address: string) => (address.length > 12 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address);

/** Reads every tracked wallet on a chain, prices it with Coinbase, and totals it across wallets. */
export async function buildPortfolio(chain: Chain, tracked: TrackedWallet[]): Promise<PortfolioView> {
  const reader = readers[chain];
  const [spot, snapshots] = await Promise.all([
    getSpotPrices(),
    Promise.allSettled(tracked.map((wallet) => reader.readWallet(wallet.address))),
  ]);
  const priceOf = (symbol: string | null) => (symbol ? (spot.get(symbol.toUpperCase()) ?? null) : null);
  const valueOf = (symbol: string | null, amount: number) => {
    const price = priceOf(symbol);
    return price === null ? null : price * amount;
  };
  const side = (token: PositionToken): PositionSide => ({ symbol: token.symbol, amount: token.amount, value: valueOf(token.priceSymbol, token.amount) });
  const sum = (values: (number | null)[]) => values.reduce<number>((total, value) => total + (value ?? 0), 0);

  const holdings = new Map<string, HoldingRow>();
  const positions: PositionRow[] = [];
  const wallets: WalletRow[] = [];
  const exposure = new Map<string, number>();
  const expose = (symbol: string | null, amount: number) => {
    if (!symbol || priceOf(symbol) === null) return;
    const key = symbol.toUpperCase();
    exposure.set(key, (exposure.get(key) ?? 0) + amount);
  };

  tracked.forEach((wallet, index) => {
    const result = snapshots[index];
    if (result.status === "rejected") {
      wallets.push({
        id: wallet.id,
        address: wallet.address,
        label: wallet.label,
        value: 0,
        status: "error",
        error: result.reason instanceof Error ? result.reason.message : "This wallet could not be read.",
        warnings: [],
      });
      return;
    }
    const snapshot: WalletSnapshot = result.value;
    let walletValue = 0;

    for (const token of snapshot.tokens) {
      const value = valueOf(token.priceSymbol, token.amount);
      walletValue += value ?? 0;
      expose(token.priceSymbol, token.amount);
      const existing = holdings.get(token.id);
      if (existing) {
        existing.amount += token.amount;
        existing.value = existing.value === null || value === null ? existing.value ?? value : existing.value + value;
      } else {
        holdings.set(token.id, {
          id: token.id,
          symbol: token.symbol,
          name: token.name,
          amount: token.amount,
          priceSymbol: token.priceSymbol,
          price: priceOf(token.priceSymbol),
          value,
          change: null,
        });
      }
    }

    // Positions where no side has a Coinbase price are almost always airdropped spam
    // (e.g. a fake "Claim Rewards" pool NFT); hide them and say how many were hidden.
    const priced = snapshot.positions.filter((position) => position.tokens.some((token) => priceOf(token.priceSymbol) !== null));
    const hidden = snapshot.positions.length - priced.length;
    if (hidden > 0) {
      snapshot.warnings.push(`${hidden} unpriced ${hidden === 1 ? "position" : "positions"} hidden (likely spam).`);
    }

    for (const position of priced) {
      const tokens = position.tokens.map(side);
      const fees = (position.fees ?? []).map(side);
      const value = tokens.every((t) => t.value === null) ? null : sum(tokens.map((t) => t.value)) + sum(fees.map((t) => t.value));
      walletValue += value ?? 0;
      for (const token of [...position.tokens, ...(position.fees ?? [])]) expose(token.priceSymbol, token.amount);
      positions.push({
        id: `${wallet.id}:${position.id}`,
        walletId: wallet.id,
        wallet: wallet.label ?? shorten(wallet.address),
        protocol: position.protocol,
        pool: position.pool,
        tokens,
        fees,
        inRange: position.inRange ?? null,
        value,
      });
    }

    wallets.push({ id: wallet.id, address: wallet.address, label: wallet.label, value: walletValue, status: "ok", warnings: snapshot.warnings });
  });

  const holdingRows = [...holdings.values()];
  const changes = await get24hChanges(holdingRows.flatMap((h) => (h.priceSymbol && h.price !== null ? [h.priceSymbol] : [])).concat([...exposure.keys()]));
  for (const row of holdingRows) row.change = row.priceSymbol ? (changes.get(row.priceSymbol.toUpperCase()) ?? null) : null;

  const tokensValue = sum(holdingRows.map((h) => h.value));
  const positionsValue = sum(positions.map((p) => p.value));
  const total = tokensValue + positionsValue;

  // Weight each exposure's 24h move by its current value to get the portfolio's move.
  let weighted = 0;
  let weight = 0;
  for (const [symbol, amount] of exposure) {
    const change = changes.get(symbol);
    const value = (priceOf(symbol) ?? 0) * amount;
    if (change === null || change === undefined || value <= 0) continue;
    weighted += change * value;
    weight += value;
  }

  return {
    wallets,
    holdings: holdingRows,
    positions,
    tokensValue,
    positionsValue,
    total,
    change24h: weight > 0 ? weighted / weight : null,
    exposure: [...exposure].map(([priceSymbol, amount]) => ({ priceSymbol, amount })),
    pricedAt: new Date().toISOString(),
  };
}
