import type { Metadata } from "next";
import { Dashboard } from "../../_portfolio/dashboard";

export const metadata: Metadata = {
  title: "Solana Portfolio | Orbit",
  description: "Explore the Solana portfolio preview.",
};

export default function SolanaPortfolioPage() {
  return <Dashboard chain="Solana" />;
}
