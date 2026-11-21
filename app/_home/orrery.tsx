"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import { chainTotals, chains, compactMoney, holdings, portfolioTotal, type Chain, type Filter } from "../_portfolio/data";

/** Theme palette family for each chain: pale bodies with dark lettering, per the gothic theme. */
export const chainTone: Record<Chain, { fill: string; ink: string; ring: string }> = {
  Solana: { fill: "var(--color-background-purple)", ink: "var(--color-text-purple)", ring: "var(--color-border-purple)" },
  EVM: { fill: "var(--color-background-blue)", ink: "var(--color-text-blue)", ring: "var(--color-border-blue)" },
  Sui: { fill: "var(--color-background-cyan)", ink: "var(--color-text-cyan)", ring: "var(--color-border-cyan)" },
};

const CX = 600;
const CY = 300;
/** Largest chain sits closest to the centre. */
const orbitRadius: Record<Chain, number> = { Solana: 220, EVM: 350, Sui: 480 };
const DIAL_RADIUS = 566;
/** One inner-orbit revolution per minute; outer orbits slow down the way planets do. */
const BASE_SPEED = (Math.PI * 2) / 60;

const bodies = chains.flatMap((chain) => {
  const own = holdings.filter((h) => h.chain === chain);
  return own.map((holding, index) => ({
    holding,
    radius: 4 + Math.sqrt(holding.value) / 9,
    orbit: orbitRadius[chain],
    start: (index / own.length) * Math.PI * 2 + chains.indexOf(chain) * 1.1,
    speed: BASE_SPEED * Math.pow(orbitRadius.Solana / orbitRadius[chain], 1.5),
  }));
});

/** Two decimals keeps server and client markup identical during hydration. */
const round = (n: number) => Math.round(n * 100) / 100;

const shares = chains.reduce<{ chain: Chain; share: number; offset: number }[]>((acc, chain) => {
  const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].share : 0;
  return [...acc, { chain, share: (chainTotals[chain] / portfolioTotal) * 100, offset }];
}, []);

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
  // Phones get a steeper view of the system so it stays tall enough to read.
  const tilt = isNarrow ? 0.62 : 0.34;
  const labelSize = isNarrow ? 34 : 15;
  const halfHeight = Math.round((DIAL_RADIUS + 24) * tilt);

  const placed = bodies
    .map((body) => {
      const angle = body.start + elapsed * body.speed;
      const depth = Math.sin(angle); // -1 far side, +1 near side
      const scale = 0.82 + 0.18 * depth;
      return {
        ...body,
        x: round(CX + Math.cos(angle) * body.orbit),
        y: round(CY + depth * body.orbit * tilt),
        r: round(body.radius * scale),
        depth,
      };
    })
    .sort((a, b) => a.depth - b.depth);

  const renderBody = (body: (typeof placed)[number]) => {
    const tone = chainTone[body.holding.chain];
    const lit = isLit(body.holding.chain);
    return (
      <g key={body.holding.id} opacity={lit ? round(0.62 + 0.38 * ((body.depth + 1) / 2)) : 0.12}>
        <title>{`${body.holding.name} on ${body.holding.chain}: ${compactMoney(body.holding.value)}`}</title>
        <circle cx={body.x} cy={body.y} r={body.r} fill={tone.fill} />
        <text
          x={body.x + body.r + 8}
          y={body.y}
          dominantBaseline="central"
          fontSize={labelSize}
          fontFamily="var(--font-family-body)"
          fill="var(--color-text-secondary)"
        >
          {body.holding.symbol}
        </text>
      </g>
    );
  };

  return (
    <svg
      width="100%"
      viewBox={`0 ${CY - halfHeight} 1200 ${halfHeight * 2}`}
      role="img"
      aria-label={`Sample portfolio drawn as orbits. Total ${compactMoney(portfolioTotal)}: ${shares
        .map((s) => `${s.chain} ${Math.round(s.share)} percent`)
        .join(", ")}. Each body is one holding, sized by its value.`}
    >
      {/* Dial: fine ticks every percent, long ticks every ten, arcs for each chain's share of the total. */}
      <ellipse cx={CX} cy={CY} rx={DIAL_RADIUS} ry={round(DIAL_RADIUS * tilt)} fill="none" stroke="var(--color-border-emphasized)" strokeWidth={8} pathLength={100} strokeDasharray="0.06 0.94" />
      <ellipse cx={CX} cy={CY} rx={DIAL_RADIUS} ry={round(DIAL_RADIUS * tilt)} fill="none" stroke="var(--color-text-secondary)" strokeWidth={16} pathLength={100} strokeDasharray="0.08 9.92" />
      {shares.map(({ chain, share, offset }) => (
        <ellipse
          key={chain}
          cx={CX}
          cy={CY}
          rx={DIAL_RADIUS + 16}
          ry={round((DIAL_RADIUS + 16) * tilt)}
          fill="none"
          stroke={chainTone[chain].fill}
          strokeWidth={3}
          pathLength={100}
          strokeDasharray={`${round(share - 0.6)} ${round(100 - share + 0.6)}`}
          strokeDashoffset={-round(offset)}
          opacity={isLit(chain) ? 1 : 0.15}
        />
      ))}

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

      {placed.filter((b) => b.depth < 0).map(renderBody)}

      <circle cx={CX} cy={CY} r={isNarrow ? 118 : 74} fill="var(--color-background-card)" stroke="var(--color-border-emphasized)" />
      <text x={CX} y={CY - (isNarrow ? 10 : 6)} textAnchor="middle" fontFamily="var(--font-family-body)" fontWeight={700} fontSize={isNarrow ? 58 : 30} fill="var(--color-text-primary)">
        {compactMoney(filter === "All chains" ? portfolioTotal : chainTotals[filter])}
      </text>
      <text x={CX} y={CY + (isNarrow ? 44 : 22)} textAnchor="middle" fontFamily="var(--font-family-body)" fontSize={isNarrow ? 30 : 14} fill="var(--color-text-secondary)">
        {filter === "All chains" ? "sample total" : `on ${filter}`}
      </text>

      {placed.filter((b) => b.depth >= 0).map(renderBody)}
    </svg>
  );
}
