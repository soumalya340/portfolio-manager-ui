import type { Metadata } from "next";
import { Dashboard } from "../../_portfolio/dashboard";

export const metadata: Metadata = {
  title: "EVM Portfolio | Orbit",
  description: "Explore the Ethereum and EVM portfolio preview.",
};

export default function EvmPortfolioPage() {
  return <Dashboard chain="EVM" />;
}
