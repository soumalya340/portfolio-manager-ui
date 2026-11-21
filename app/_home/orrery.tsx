"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@astryxdesign/core/hooks";
export type Chain = "Solana" | "EVM" | "Sui";
export type Filter = "All chains" | Chain;
export const chains: Chain[] = ["Solana", "EVM", "Sui"];

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
  const labelSize = isNarrow ? 42 : 18;
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
        radius: round((isNarrow ? 30 : 24) * (0.82 + 0.18 * depth)),
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
      <defs>
        <radialGradient id="orbit-core-sphere" cx="32%" cy="24%" r="82%" fx="30%" fy="20%">
          <stop offset="0%" stopColor="var(--color-border-emphasized)" />
          <stop offset="24%" stopColor="var(--color-background-card)" />
          <stop offset="68%" stopColor="var(--color-background-card)" />
          <stop offset="100%" stopColor="var(--color-background-body)" />
        </radialGradient>
        {chains.map((chain) => (
          <radialGradient key={chain} id={`orbit-${chain}-sphere`} cx="30%" cy="24%" r="82%" fx="28%" fy="20%">
            <stop offset="0%" stopColor="var(--color-text-primary)" />
            <stop offset="18%" stopColor={chainTone[chain].fill} />
            <stop offset="58%" stopColor={chainTone[chain].fill} />
            <stop offset="82%" stopColor={chainTone[chain].ink} />
            <stop offset="100%" stopColor="var(--color-background-body)" />
          </radialGradient>
        ))}
        <filter id="orbit-sphere-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="7" stdDeviation="5" floodColor="var(--color-background-body)" floodOpacity="0.8" />
        </filter>
        <filter id="orbit-sphere-glint" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
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

      <circle cx={CX} cy={CY} r={isNarrow ? 132 : 74} fill="url(#orbit-core-sphere)" stroke="var(--color-border-emphasized)" strokeWidth={2} filter="url(#orbit-sphere-shadow)" />
      <ellipse cx={CX - (isNarrow ? 34 : 22)} cy={CY - (isNarrow ? 45 : 28)} rx={isNarrow ? 45 : 28} ry={isNarrow ? 20 : 12} fill="var(--color-text-primary)" opacity={0.12} filter="url(#orbit-sphere-glint)" />
      <text x={CX} y={CY - (isNarrow ? 10 : 6)} textAnchor="middle" fontFamily="var(--font-family-body)" fontWeight={700} fontSize={isNarrow ? 55 : 25} fill="var(--color-text-primary)">
        {filter === "All chains" ? "One view" : filter}
      </text>
      <text x={CX} y={CY + (isNarrow ? 48 : 22)} textAnchor="middle" fontFamily="var(--font-family-body)" fontSize={isNarrow ? 34 : 14} fill="var(--color-text-secondary)">
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
        <circle cx={body.x} cy={body.y} r={body.radius} fill={`url(#orbit-${body.chain}-sphere)`} stroke={tone.ink} strokeOpacity={0.35} strokeWidth={1.5} filter="url(#orbit-sphere-shadow)" />
        <ellipse cx={body.x - body.radius * 0.3} cy={body.y - body.radius * 0.36} rx={body.radius * 0.34} ry={body.radius * 0.15} fill="var(--color-text-primary)" opacity={0.5} filter="url(#orbit-sphere-glint)" />
        <text x={body.x + body.radius + 8} y={body.y} dominantBaseline="central" fontSize={labelSize} fontFamily="var(--font-family-body)" fill="var(--color-text-secondary)">
          {body.chain}
        </text>
      </g>
    );
  }
}
