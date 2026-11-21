"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Show } from "@clerk/nextjs";
import { Layout, LayoutContent, LayoutFooter, LayoutHeader, VStack, HStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Grid } from "@astryxdesign/core/Grid";
import { Item } from "@astryxdesign/core/Item";
import { List, ListItem } from "@astryxdesign/core/List";
import { Icon } from "@astryxdesign/core/Icon";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Link } from "@astryxdesign/core/Link";
import { Table, proportional } from "@astryxdesign/core/Table";
import type { TableColumn } from "@astryxdesign/core/Table";
import { useMediaQuery } from "@astryxdesign/core/hooks";
import { ChartBarIcon, EyeSlashIcon, GlobeAltIcon, PauseIcon, PlayIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { chainTotals, chains, holdings, money, portfolioTotal, type Chain, type Filter, type Holding } from "./_portfolio/data";
import { Orrery, chainTone } from "./_home/orrery";

const inside = [
  {
    icon: GlobeAltIcon,
    label: "Your total across every chain",
    description: "One figure for everything you hold, with each network's share beside it.",
  },
  {
    icon: ChartBarIcon,
    label: "Performance from 24 hours to a year",
    description: "Switch the period to see how much the portfolio gained or lost, in dollars and percent.",
  },
  {
    icon: TableCellsIcon,
    label: "Every holding in one table",
    description: "Sort by value or daily change, and search by token, symbol, or network.",
  },
  {
    icon: EyeSlashIcon,
    label: "Hide balances",
    description: "Mask every figure with one click when someone can see your screen.",
  },
];

const columns: TableColumn<Holding>[] = [
  {
    key: "name",
    header: "Asset",
    width: proportional(2),
    renderCell: (row) => (
      <HStack gap={3} vAlign="center">
        <Avatar name={row.symbol} size="sm" tooltip={false} />
        <Text weight="semibold">{row.name}</Text>
      </HStack>
    ),
  },
  {
    key: "chain",
    header: "Network",
    width: proportional(1),
    renderCell: (row) => <Text color="secondary">{row.chain}</Text>,
  },
  {
    key: "change",
    header: "24h",
    align: "end",
    width: proportional(1),
    renderCell: (row) => (
      <Text color="secondary" hasTabularNumbers>
        {row.change >= 0 ? "+" : "−"}
        {Math.abs(row.change).toFixed(2)}%
      </Text>
    ),
  },
  {
    key: "value",
    header: "Value",
    align: "end",
    width: proportional(1),
    renderCell: (row) => (
      <Text weight="semibold" hasTabularNumbers>
        {money(row.value)}
      </Text>
    ),
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

  const rows = [...(filter === "All chains" ? holdings : holdings.filter((h) => h.chain === filter))].sort((a, b) => b.value - a.value);
  const rowsTotal = filter === "All chains" ? portfolioTotal : chainTotals[filter];

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
            <HStack gap={2}>
              <Show when="signed-out">
                <Button label="Sign in" variant="ghost" href="/sign-in" as={NextLink} />
                <Button label="Create account" variant="primary" href="/sign-up" as={NextLink} />
              </Show>
              <Show when="signed-in">
                <Button label="Open portfolio" variant="primary" href="/portfolio" as={NextLink} />
              </Show>
            </HStack>
          </HStack>
        </LayoutHeader>
      }
      content={
        <LayoutContent role="main" isScrollable={false}>
          <VStack gap={10} paddingBlock={10}>
            <VStack gap={6} hAlign="center">
              <VStack gap={4} hAlign="center" maxWidth={760}>
                <Text as="h1" type="display-1" display="block" justify="center" textWrap="balance">
                  Every chain you hold, in one orbit
                </Text>
                <Text type="large" color="secondary" justify="center" textWrap="balance">
                  Orbit adds up your Solana, Ethereum and Sui holdings, so you can see what you own, where it sits, and how it moved.
                </Text>
              </VStack>
              <Show when="signed-out">
                <HStack gap={3}>
                  <Button label="Create account" variant="primary" size="lg" href="/sign-up" as={NextLink} />
                  <Button label="Sign in" variant="secondary" size="lg" href="/sign-in" as={NextLink} />
                </HStack>
              </Show>
              <Show when="signed-in">
                <Button label="Open your portfolio" variant="primary" size="lg" href="/portfolio" as={NextLink} />
              </Show>
            </VStack>

            <VStack gap={6} hAlign="center">
              <Orrery filter={filter} isPaused={isPaused} />

              <VStack gap={4} width="100%" maxWidth={960}>
                <HStack hAlign="between" vAlign="center" gap={4}>
                  <Text color="secondary">Choose a chain to light up its orbit.</Text>
                  <Button
                    label={isPaused ? "Resume orbit" : "Pause orbit"}
                    variant="ghost"
                    size="sm"
                    isIconOnly={isNarrow}
                    icon={<Icon icon={isPaused ? PlayIcon : PauseIcon} />}
                    onClick={() => setPausedByUser(!isPaused)}
                  />
                </HStack>
                <Grid columns={{ minWidth: 220, max: 3 }} gap={3}>
                  {chains.map((chain) => (
                    <Item
                      key={chain}
                      label={chain}
                      description={`${Math.round((chainTotals[chain] / portfolioTotal) * 100)}% of the total`}
                      startContent={<ChainDot chain={chain} />}
                      endContent={
                        <Text weight="semibold" hasTabularNumbers>
                          {money(chainTotals[chain])}
                        </Text>
                      }
                      isSelected={filter === chain}
                      onClick={() => setFilter(filter === chain ? "All chains" : chain)}
                    />
                  ))}
                </Grid>

                <Card padding={0}>
                  <HStack hAlign="between" vAlign="center" padding={4} gap={2} wrap="wrap">
                    <Heading level={2}>{filter === "All chains" ? "Sample holdings" : `Sample holdings on ${filter}`}</Heading>
                    <HStack gap={3} vAlign="center">
                      <Text color="secondary">
                        {rows.length} assets, {money(rowsTotal)}
                      </Text>
                      {filter !== "All chains" && (
                        <Button label="Show all chains" variant="ghost" size="sm" onClick={() => setFilter("All chains")} />
                      )}
                    </HStack>
                  </HStack>
                  {isNarrow ? (
                    <List hasDividers>
                      {rows.map((row) => (
                        <ListItem
                          key={row.id}
                          label={row.name}
                          description={row.chain}
                          startContent={<Avatar name={row.symbol} size="sm" tooltip={false} />}
                          endContent={
                            <Text weight="semibold" hasTabularNumbers>
                              {money(row.value)}
                            </Text>
                          }
                        />
                      ))}
                    </List>
                  ) : (
                    <Table<Holding> data={rows} columns={columns} idKey="id" />
                  )}
                </Card>
              </VStack>
            </VStack>

            <Grid columns={{ minWidth: 320, max: 2 }} gap={10}>
              <VStack gap={3}>
                <Text as="h2" type="display-2" display="block" textWrap="balance">
                  What opens after you sign in
                </Text>
                <Text color="secondary" textWrap="pretty">
                  The portfolio view is built around the same three chains, with a filter to look at one at a time and a table you can sort.
                </Text>
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
          <HStack hAlign="between" vAlign="center" gap={4}>
            <Text color="secondary">Figures on this page are sample data.</Text>
            <Show when="signed-out">
              <Link href="/sign-in" as={NextLink}>
                Sign in
              </Link>
            </Show>
            <Show when="signed-in">
              <Link href="/portfolio" as={NextLink}>
                Open portfolio
              </Link>
            </Show>
          </HStack>
        </LayoutFooter>
      }
    />
  );
}
