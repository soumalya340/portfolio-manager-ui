"use server";

import { auth } from "@clerk/nextjs/server";
import { readers } from "@/lib/chains";
import { deleteWallet, insertWallet, listWallets } from "@/lib/db";
import { buildPortfolio } from "@/lib/portfolio";
import type { PortfolioView, TrackResult } from "@/lib/portfolio-types";
import { getValueHistory, type HistoryPoint, type Period } from "@/lib/prices";
import { chains, type Chain } from "./data";

const MAX_WALLETS_PER_CHAIN = 10;
const PERIODS: Period[] = ["24H", "7D", "30D", "90D", "1Y"];

// Server functions are reachable by direct POST, so every one checks the session and its inputs.
async function requireUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Sign in to track wallets.");
  return userId;
}

function requireChain(chain: unknown): Chain {
  if (!chains.includes(chain as Chain)) throw new Error("Unknown network.");
  return chain as Chain;
}

export async function getTrackedPortfolio(chain: Chain): Promise<PortfolioView> {
  const userId = await requireUser();
  const network = requireChain(chain);
  return buildPortfolio(network, await listWallets(userId, network));
}

export async function trackWallet(chain: Chain, address: string, label: string): Promise<TrackResult> {
  const userId = await requireUser();
  const network = requireChain(chain);
  const reader = readers[network];
  const trimmed = String(address ?? "").trim();
  const name = String(label ?? "").trim().slice(0, 40) || null;

  if (!reader.isValidAddress(trimmed)) {
    return { ok: false, error: `That isn't a valid ${network === "EVM" ? "Ethereum" : network} address. Check it and try again.` };
  }
  if ((await listWallets(userId, network)).length >= MAX_WALLETS_PER_CHAIN) {
    return { ok: false, error: `You can track up to ${MAX_WALLETS_PER_CHAIN} wallets per network. Remove one to add another.` };
  }
  const saved = await insertWallet(userId, network, reader.normalizeAddress(trimmed), name);
  if (!saved) return { ok: false, error: "You're already tracking this wallet." };
  return { ok: true };
}

export async function untrackWallet(id: number): Promise<TrackResult> {
  const userId = await requireUser();
  if (!Number.isSafeInteger(id)) return { ok: false, error: "Unknown wallet." };
  return (await deleteWallet(userId, id)) ? { ok: true } : { ok: false, error: "That wallet was already removed." };
}

export async function getPortfolioHistory(exposure: { priceSymbol: string; amount: number }[], period: Period): Promise<HistoryPoint[]> {
  await requireUser();
  if (!PERIODS.includes(period)) throw new Error("Unknown period.");
  const clean = (Array.isArray(exposure) ? exposure : [])
    .slice(0, 50)
    .filter((e) => typeof e?.priceSymbol === "string" && /^[A-Z0-9]{1,15}$/i.test(e.priceSymbol) && Number.isFinite(e.amount) && e.amount > 0);
  return getValueHistory(clean, period);
}
