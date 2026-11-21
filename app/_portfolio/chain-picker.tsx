"use client";

import { useRef } from "react";
import { VStack, HStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Grid } from "@astryxdesign/core/Grid";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Icon } from "@astryxdesign/core/Icon";
import { chainInfo, chainPaths, chains, type Chain } from "./data";

/** On wide screens the outer cards turn inward, so the three stand in a shallow arc around the viewer. */
const arc = ["lg:rotate-y-8", "", "lg:-rotate-y-8"];

/**
 * Each card is frosted glass over a glow in its chain's colour (the same pastels as the homepage orrery).
 * Hovering or focusing a card brightens the glow and lights its border in that colour.
 */
const glass: Record<Chain, { glow: string; edge: string }> = {
  Solana: { glow: "bg-purple-subtle", edge: "group-hover:border-purple-ring group-focus-within:border-purple-ring" },
  EVM: { glow: "bg-blue-subtle", edge: "group-hover:border-blue-ring group-focus-within:border-blue-ring" },
  Sui: { glow: "bg-cyan-subtle", edge: "group-hover:border-cyan-ring group-focus-within:border-cyan-ring" },
};

const COIN = 96;
const MAX_TILT = 10; // degrees

function ChainCard({ chain, index }: { chain: Chain; index: number }) {
  const info = chainInfo[chain];
  const tone = glass[chain];
  const tiltRef = useRef<HTMLElement>(null);

  const setTilt = (x: number, y: number) => {
    tiltRef.current?.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`);
    tiltRef.current?.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`);
  };

  const followPointer = (event: React.PointerEvent) => {
    const card = tiltRef.current;
    if (!card || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    // Tip the card toward the pointer: right edge recedes when the pointer is on the left, and so on.
    setTilt(x * MAX_TILT * 1.2, -y * MAX_TILT);
  };

  return (
    <VStack height="100%" className="perspective-distant">
      <VStack height="100%" className={`transform-3d ${arc[index]}`}>
        <VStack
          ref={tiltRef}
          height="100%"
          onPointerMove={followPointer}
          onPointerLeave={() => setTilt(0, 0)}
          className="group relative transform-3d rotate-x-(--tilt-x) rotate-y-(--tilt-y) transition-transform duration-300 ease-out motion-reduce:transition-none"
        >
          {/* The colour the glass frosts: it sits behind the card in 3D space and brightens on hover or focus. */}
          <VStack
            aria-hidden
            className={`pointer-events-none absolute inset-4 -translate-z-12 rounded-full opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-90 group-focus-within:opacity-90 motion-reduce:transition-none ${tone.glow}`}
          />
          <ClickableCard
            label={`Open ${chain} portfolio`}
            href={chainPaths[chain]}
            padding={6}
            elevation="low"
            height="100%"
            className={`border border-inverted/10 bg-card/35 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 group-hover:bg-card/20 group-focus-within:bg-card/20 motion-reduce:transition-none ${tone.edge}`}
          >
            <VStack gap={10} height="100%" vAlign="between">
              <HStack hAlign="between" vAlign="start">
                {/* Holds the coin's place; the coin itself floats above the card, outside it. */}
                <VStack width={COIN} height={COIN} aria-hidden />
                <Icon icon="chevronRight" color="secondary" />
              </HStack>
              <VStack gap={1}>
                <Heading level={2} type="display-3">
                  {info.label}
                </Heading>
                <Text color="secondary">{info.description}</Text>
              </VStack>
            </VStack>
          </ClickableCard>

          {/* Contact shadow on the card face, and the coin lifted off it. Both ignore the pointer so the card stays clickable. */}
          <VStack
            width={COIN}
            height={COIN}
            aria-hidden
            className="pointer-events-none absolute top-8 left-7 rounded-full bg-shadow opacity-70 blur-lg"
          />
          <VStack aria-hidden className="pointer-events-none absolute top-6 left-6 translate-z-16 transform-3d">
            <Avatar src={info.image} name={chain} alt="" size={COIN} tooltip={false} />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

export function ChainPicker() {
  return (
    <VStack minHeight="100dvh" padding={8} hAlign="center">
      <VStack maxWidth={1120} width="100%" minHeight="100%" gap={10} vAlign="between">
        <Text type="display-3" weight="bold">
          orbit.
        </Text>

        <VStack gap={8}>
          <VStack gap={3} hAlign="center">
            <Text as="h1" type="display-1" display="block" justify="center">
              Choose a chain
            </Text>
            <Text type="large" color="secondary" justify="center" textWrap="balance">
              Select a network to open its portfolio overview. You can switch networks at any time.
            </Text>
          </VStack>

          <Grid columns={{ minWidth: 240, max: 3 }} gap={6}>
            {chains.map((chain, index) => (
              <ChainCard key={chain} chain={chain} index={index} />
            ))}
          </Grid>

          <Text type="supporting" color="secondary" justify="center">
            Sample portfolio data
          </Text>
        </VStack>

        <Text type="supporting" color="secondary" justify="center">
          Three networks. Three focused views.
        </Text>
      </VStack>
    </VStack>
  );
}
