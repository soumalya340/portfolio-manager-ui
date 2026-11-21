"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Layout, LayoutContent, LayoutFooter, LayoutHeader, VStack, HStack } from "@astryxdesign/core/Layout";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Grid } from "@astryxdesign/core/Grid";
import { Item } from "@astryxdesign/core/Item";
import { List, ListItem } from "@astryxdesign/core/List";
import { Icon } from "@astryxdesign/core/Icon";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import { ChartBarIcon, EyeSlashIcon, GlobeAltIcon, PauseIcon, PlayIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { Orrery, chainTone, chains, type Chain, type Filter } from "./_home/orrery";

const networkCopy: Record<Chain, string> = {
  Solana: "A closer look at the Solana side of the story.",
  EVM: "Put Ethereum and EVM assets in perspective.",
  Sui: "Give your Sui holdings room to be seen.",
};

const inside = [
  {
    icon: GlobeAltIcon,
    label: "See the whole picture",
    description: "Move between a combined view and a closer look at each network.",
  },
  {
    icon: ChartBarIcon,
    label: "Follow the shape of change",
    description: "Explore the performance chart across different time ranges.",
  },
  {
    icon: TableCellsIcon,
    label: "Find what matters",
    description: "Search assets and sort the holdings table in the portfolio preview.",
  },
  {
    icon: EyeSlashIcon,
    label: "Keep numbers to yourself",
    description: "Hide balances with one click when you want a little privacy.",
  },
];

function ChainDot({ chain }: { chain: Chain }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <circle cx="6" cy="6" r="6" fill={chainTone[chain].fill} />
    </svg>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("All chains");
  const isNarrow = useMediaQuery("(max-width: 640px)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [pausedByUser, setPausedByUser] = useState<boolean | null>(null);
  const isPaused = pausedByUser ?? prefersReducedMotion;

  return (
    <Layout
      height="auto"
      contentWidth={1200}
      padding={6}
      header={
        <LayoutHeader label="Site">
          <HStack hAlign="between" vAlign="center" gap={4}>
            <Text type="display-3" weight="bold">
              orbit.
            </Text>
            <Button label="Explore the preview" variant="primary" href="/portfolio" as={NextLink} />
          </HStack>
        </LayoutHeader>
      }
      content={
        <LayoutContent role="main" isScrollable={false}>
          <VStack gap={10} paddingBlock={10}>
            <VStack gap={4} hAlign="center">
              <VStack gap={4} hAlign="center" maxWidth={760}>
                <Text as="h1" type="display-1" display="block" justify="center" textWrap="balance">
                  A clearer view of your crypto universe
                </Text>
                <Text type="large" color="secondary" justify="center" textWrap="balance">
                  Explore a calmer way to see Solana, Ethereum and Sui together. Choose a network, follow the bigger picture, and leave the noise behind.
                </Text>
              </VStack>
            </VStack>

            <VStack gap={6} hAlign="center">
              <Orrery filter={filter} isPaused={isPaused} />

              <VStack gap={4} width="100%" maxWidth={960}>
                <HStack hAlign="between" vAlign="center" gap={4}>
                  <Text color="secondary">Choose a network to bring its orbit into focus.</Text>
                  <Button
                    label={isPaused ? (isNarrow ? "Resume" : "Resume orbit") : (isNarrow ? "Pause" : "Pause orbit")}
                    variant="ghost"
                    size="sm"
                    icon={<Icon icon={isPaused ? PlayIcon : PauseIcon} />}
                    onClick={() => setPausedByUser(!isPaused)}
                  />
                </HStack>
                <Grid columns={{ minWidth: 220, max: 3 }} gap={3}>
                  {chains.map((chain) => (
                    <Item
                      key={chain}
                      label={chain}
                      description={networkCopy[chain]}
                      startContent={<ChainDot chain={chain} />}
                      isSelected={filter === chain}
                      onClick={() => setFilter(filter === chain ? "All chains" : chain)}
                    />
                  ))}
                </Grid>
                {filter !== "All chains" && (
                  <Button label="See every network" variant="ghost" size="sm" onClick={() => setFilter("All chains")} />
                )}
              </VStack>
            </VStack>

            <Grid columns={{ minWidth: 320, max: 2 }} gap={10}>
              <VStack gap={3}>
                <Text as="h2" type="display-2" display="block" textWrap="balance">
                  The big picture, without the busywork
                </Text>
                <Text color="secondary" textWrap="pretty">
                  The portfolio preview brings networks, assets and performance into one place. Explore the view and find your own way through it.
                </Text>
                <Button label="Explore the portfolio preview" variant="secondary" href="/portfolio" as={NextLink} />
              </VStack>
              <List hasDividers density="spacious" edge="flush">
                {inside.map((entry) => (
                  <ListItem
                    key={entry.label}
                    label={entry.label}
                    description={<Text color="secondary">{entry.description}</Text>}
                    align="first-line"
                    startContent={<Icon icon={entry.icon} color="secondary" />}
                  />
                ))}
              </List>
            </Grid>
          </VStack>
        </LayoutContent>
      }
      footer={
        <LayoutFooter hasDivider>
          <Text color="secondary">Orbit · A wider perspective on your portfolio.</Text>
        </LayoutFooter>
      }
    />
  );
}
