import type { Metadata } from "next";
import { Dashboard } from "../../_portfolio/dashboard";

export const metadata: Metadata = {
  title: "Sui Portfolio | Orbit",
  description: "Explore the Sui portfolio preview.",
};

export default function SuiPortfolioPage() {
  return <Dashboard chain="Sui" />;
}
