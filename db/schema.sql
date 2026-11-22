-- Wallets a signed-in user tracks, one row per (user, chain, address).
-- Apply with: node --env-file=.env.local db/migrate.mjs
CREATE TABLE IF NOT EXISTS tracked_wallets (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id     text        NOT NULL,                       -- Clerk user id
  chain       text        NOT NULL CHECK (chain IN ('Solana', 'EVM', 'Sui')),
  address     text        NOT NULL,                       -- normalized by the chain reader
  label       text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, chain, address)
);

CREATE INDEX IF NOT EXISTS tracked_wallets_user_chain_idx ON tracked_wallets (user_id, chain);
