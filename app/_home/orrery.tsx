"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import { chains, type Chain, type Filter } from "../_portfolio/data";

/** Theme palette family for each network, shared with the homepage selector. */
export const chainTone: Record<Chain, { fill: string; ink: string; ring: string }> = {
  Solana: { fill: "var(--color-background-purple)", ink: "var(--color-text-purple)", ring: "var(--color-border-purple)" },
  EVM: { fill: "var(--color-background-blue)", ink: "var(--color-text-blue)", ring: "var(--color-border-blue)" },
  Sui: { fill: "var(--color-background-cyan)", ink: "var(--color-text-cyan)", ring: "var(--color-border-cyan)" },
};

const CX = 600;
const CY = 300;
const orbitRadius: Record<Chain, number> = { Solana: 220, EVM: 350, Sui: 480 };
const DIAL_RADIUS = 566;
const BASE_SPEED = (Math.PI * 2) / 60;
const round = (n: number) => Math.round(n * 100) / 100;

export function Orrery({ filter, isPaused }: { filter: Filter; isPaused: boolean }) {
  const [elapsed, setElapsed] = useState(0);
  const isNarrow = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    if (isPaused) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      setElapsed((t) => t + Math.min(now - last, 100) / 1000);
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isPaused]);

  const isLit = (chain: Chain) => filter === "All chains" || filter === chain;
  const tilt = isNarrow ? 0.62 : 0.34;
  const labelSize = isNarrow ? 34 : 18;
  const halfHeight = Math.round((DIAL_RADIUS + 24) * tilt);
  const placed = chains
    .map((chain, index) => {
      const angle = index * 2.2 + elapsed * BASE_SPEED * Math.pow(orbitRadius.Solana / orbitRadius[chain], 1.5);
      const depth = Math.sin(angle);
      return {
        chain,
        depth,
        x: round(CX + Math.cos(angle) * orbitRadius[chain]),
        y: round(CY + depth * orbitRadius[chain] * tilt),
        radius: round(24 * (0.82 + 0.18 * depth)),
      };
    })
    .sort((a, b) => a.depth - b.depth);

  return (
    <svg
      width="100%"
      viewBox={`0 ${CY - halfHeight} 1200 ${halfHeight * 2}`}
      role="img"
      aria-label={`Animated orbits for Solana, EVM and Sui. ${filter === "All chains" ? "All networks" : filter} in focus.`}
    >
      <ellipse cx={CX} cy={CY} rx={DIAL_RADIUS} ry={round(DIAL_RADIUS * tilt)} fill="none" stroke="var(--color-border-emphasized)" strokeWidth={8} pathLength={100} strokeDasharray="0.06 0.94" />
      <ellipse cx={CX} cy={CY} rx={DIAL_RADIUS} ry={round(DIAL_RADIUS * tilt)} fill="none" stroke="var(--color-text-secondary)" strokeWidth={16} pathLength={100} strokeDasharray="0.08 9.92" />

      {chains.map((chain) => (
        <ellipse
          key={chain}
          cx={CX}
          cy={CY}
          rx={orbitRadius[chain]}
          ry={round(orbitRadius[chain] * tilt)}
          fill="none"
          stroke={filter === chain ? chainTone[chain].ring : "var(--color-border-emphasized)"}
          strokeWidth={filter === chain ? 2 : 1}
          vectorEffect="non-scaling-stroke"
          opacity={isLit(chain) ? 1 : 0.35}
        />
      ))}

      {placed.filter((body) => body.depth < 0).map(renderBody)}

      <circle cx={CX} cy={CY} r={isNarrow ? 118 : 74} fill="var(--color-background-card)" stroke="var(--color-border-emphasized)" />
      <text x={CX} y={CY - (isNarrow ? 10 : 6)} textAnchor="middle" fontFamily="var(--font-family-body)" fontWeight={700} fontSize={isNarrow ? 42 : 25} fill="var(--color-text-primary)">
        {filter === "All chains" ? "One view" : filter}
      </text>
      <text x={CX} y={CY + (isNarrow ? 44 : 22)} textAnchor="middle" fontFamily="var(--font-family-body)" fontSize={isNarrow ? 29 : 14} fill="var(--color-text-secondary)">
        {filter === "All chains" ? "every chain" : "in focus"}
      </text>

      {placed.filter((body) => body.depth >= 0).map(renderBody)}
    </svg>
  );

  function renderBody(body: (typeof placed)[number]) {
    const tone = chainTone[body.chain];
    return (
      <g key={body.chain} opacity={isLit(body.chain) ? round(0.62 + 0.38 * ((body.depth + 1) / 2)) : 0.12}>
        <title>{`${body.chain} network`}</title>
        <circle cx={body.x} cy={body.y} r={body.radius} fill={tone.fill} />
        <text x={body.x + body.radius + 8} y={body.y} dominantBaseline="central" fontSize={labelSize} fontFamily="var(--font-family-body)" fill="var(--color-text-secondary)">
          {body.chain}
        </text>
      </g>
    );
  }
}
