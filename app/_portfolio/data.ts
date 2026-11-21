export type Chain = "Solana" | "EVM" | "Sui";
export type Period = "24H" | "7D" | "30D" | "90D" | "1Y";

export const chains: Chain[] = ["Solana", "EVM", "Sui"];
export const chainPaths: Record<Chain, string> = {
  Solana: "/portfolio/solana",
  EVM: "/portfolio/evm",
  Sui: "/portfolio/sui",
};
export const periods: Period[] = ["24H", "7D", "30D", "90D", "1Y"];

/** Chain labels and local logo assets used throughout the portfolio. */
export const chainInfo: Record<
  Chain,
  { image: string; label: string; description: string }
> = {
  Solana: { image: "/chains/solana.png", label: "SOL", description: "Explore your Solana assets" },
  EVM: { image: "/chains/ethereum.png", label: "EVM", description: "Explore Ethereum and EVM assets" },
  Sui: { image: "/chains/sui.png", label: "SUI", description: "Explore your Sui assets" },
};

export interface Holding extends Record<string, unknown> {
  id: string;
  name: string;
  symbol: string;
  chain: Chain;
  quantity: string;
  price: number;
  value: number;
  change: number;
}

export const holdings: Holding[] = [
  { id: "sol-sol", name: "Solana", symbol: "SOL", chain: "Solana", quantity: "289.142", price: 167.03, value: 48296.18, change: 5.24 },
  { id: "evm-eth", name: "Ethereum", symbol: "ETH", chain: "EVM", quantity: "11.485", price: 3199.41, value: 36745.2, change: 2.81 },
  { id: "sol-jup", name: "Jupiter", symbol: "JUP", chain: "Solana", quantity: "19,882.889", price: 0.9, value: 17892.6, change: 8.46 },
  { id: "sui-sui", name: "Sui", symbol: "SUI", chain: "Sui", quantity: "5,776.376", price: 2.925, value: 16894.64, change: -1.32 },
  { id: "sol-usdc", name: "USD Coin", symbol: "USDC", chain: "Solana", quantity: "15,052.02", price: 1, value: 15052.02, change: 0.01 },
  { id: "evm-usdc", name: "USD Coin", symbol: "USDC", chain: "EVM", quantity: "14,128.50", price: 1, value: 14128.5, change: 0.01 },
  { id: "evm-uni", name: "Uniswap", symbol: "UNI", chain: "EVM", quantity: "628.873", price: 12, value: 7546.48, change: -2.17 },
  { id: "sui-cetus", name: "Cetus", symbol: "CETUS", chain: "Sui", quantity: "25,601.6", price: 0.2, value: 5120.32, change: 4.09 },
  { id: "sui-usdc", name: "USD Coin", symbol: "USDC", chain: "Sui", quantity: "2,854.36", price: 1, value: 2854.36, change: 0.01 },
];

export const periodData: Record<Period, { change: number; amount: number; label: string; ticks: string[]; points: number[] }> = {
  "24H": { change: 2.84, amount: 4545.93, label: "24 hours", ticks: ["12 AM", "6 AM", "12 PM", "6 PM"], points: [29, 28, 31, 30, 33, 31, 35, 34, 32, 36, 39, 37, 38, 41, 39, 44, 42, 46, 45, 48, 47, 51, 50, 54] },
  "7D": { change: 6.18, amount: 9576.42, label: "7 days", ticks: ["Mon", "Wed", "Fri", "Sun"], points: [24, 26, 25, 29, 31, 28, 32, 30, 35, 37, 34, 39, 38, 42, 40, 44, 43, 46, 45, 50, 48, 53, 51, 56] },
  "30D": { change: 12.48, amount: 18261.27, label: "30 days", ticks: ["Start", "", "", "Today"], points: [21, 24, 23, 28, 26, 31, 29, 33, 32, 30, 36, 35, 39, 38, 43, 41, 45, 44, 48, 46, 50, 49, 53, 57] },
  "90D": { change: 19.32, amount: 26648.15, label: "90 days", ticks: ["Start", "", "", "Today"], points: [18, 21, 24, 23, 27, 29, 26, 31, 34, 33, 36, 39, 37, 41, 44, 42, 46, 48, 45, 51, 50, 54, 52, 58] },
  "1Y": { change: 38.75, amount: 45943.84, label: "year", ticks: ["Jan", "Apr", "Jul", "Oct"], points: [13, 16, 15, 19, 22, 21, 27, 24, 29, 32, 30, 35, 33, 37, 40, 38, 44, 42, 48, 46, 51, 49, 55, 59] },
};

export const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

export const compactMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 1 }).format(value);

export const chainTotals: Record<Chain, number> = {
  Solana: holdings.filter((h) => h.chain === "Solana").reduce((s, h) => s + h.value, 0),
  EVM: holdings.filter((h) => h.chain === "EVM").reduce((s, h) => s + h.value, 0),
  Sui: holdings.filter((h) => h.chain === "Sui").reduce((s, h) => s + h.value, 0),
};

export const portfolioTotal = chains.reduce((s, c) => s + chainTotals[c], 0);
