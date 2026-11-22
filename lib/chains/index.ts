import "server-only";
import type { Chain } from "@/app/_portfolio/data";
import type { ChainReader } from "./types";
import { evmReader } from "./evm";
import { solanaReader } from "./solana";
import { suiReader } from "./sui";

export const readers: Record<Chain, ChainReader> = {
  Solana: solanaReader,
  EVM: evmReader,
  Sui: suiReader,
};
