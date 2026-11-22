import "server-only";
import { neon } from "@neondatabase/serverless";
import type { Chain } from "@/app/_portfolio/data";

export interface TrackedWallet {
  id: number;
  chain: Chain;
  address: string;
  label: string | null;
  createdAt: string;
}

let client: ReturnType<typeof neon> | null = null;

function sql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Pull it with `vercel env pull` or add it to .env.local.");
  }
  client ??= neon(process.env.DATABASE_URL);
  return client;
}

type Row = { id: string | number; chain: Chain; address: string; label: string | null; created_at: string | Date };

const toWallet = (row: Row): TrackedWallet => ({
  id: Number(row.id),
  chain: row.chain,
  address: row.address,
  label: row.label,
  createdAt: new Date(row.created_at).toISOString(),
});

export async function listWallets(userId: string, chain: Chain): Promise<TrackedWallet[]> {
  const rows = (await sql()`
    SELECT id, chain, address, label, created_at
    FROM tracked_wallets
    WHERE user_id = ${userId} AND chain = ${chain}
    ORDER BY created_at ASC
  `) as Row[];
  return rows.map(toWallet);
}

/** Inserts the wallet; returns null when this user already tracks it on this chain. */
export async function insertWallet(userId: string, chain: Chain, address: string, label: string | null): Promise<TrackedWallet | null> {
  const rows = (await sql()`
    INSERT INTO tracked_wallets (user_id, chain, address, label)
    VALUES (${userId}, ${chain}, ${address}, ${label})
    ON CONFLICT (user_id, chain, address) DO NOTHING
    RETURNING id, chain, address, label, created_at
  `) as Row[];
  return rows[0] ? toWallet(rows[0]) : null;
}

/** Deletes only when the row belongs to this user. */
export async function deleteWallet(userId: string, id: number): Promise<boolean> {
  const rows = (await sql()`
    DELETE FROM tracked_wallets WHERE id = ${id} AND user_id = ${userId} RETURNING id
  `) as Row[];
  return rows.length > 0;
}
