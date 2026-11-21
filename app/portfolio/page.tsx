"use client";

import { useState } from "react";
import { ChainPicker } from "../_portfolio/chain-picker";
import { Dashboard } from "../_portfolio/dashboard";
import type { Chain, Filter } from "../_portfolio/data";

export default function PortfolioPage() {
  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  const [filter, setFilter] = useState<Filter>("All chains");

  if (selectedChain === null) {
    return (
      <ChainPicker
        onPick={(chain) => {
          setFilter(chain);
          setSelectedChain(chain);
        }}
      />
    );
  }

  return <Dashboard filter={filter} onFilterChange={setFilter} onChooseChain={() => setSelectedChain(null)} />;
}
