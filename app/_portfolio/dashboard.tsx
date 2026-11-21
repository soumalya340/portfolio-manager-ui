"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import { UserButton } from "@clerk/nextjs";
import { AppShell } from "@astryxdesign/core/AppShell";
import { SideNav, SideNavHeading, SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { TopNav } from "@astryxdesign/core/TopNav";
import { VStack, HStack, StackItem } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Card } from "@astryxdesign/core/Card";
import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Icon } from "@astryxdesign/core/Icon";
import { Button } from "@astryxdesign/core/Button";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Divider } from "@astryxdesign/core/Divider";
import { TextInput } from "@astryxdesign/core/TextInput";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Table, proportional, useTableSortable, useTableSortableState } from "@astryxdesign/core/Table";
import type { TableColumn } from "@astryxdesign/core/Table";
import { EyeIcon, Square2StackIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import {
  chainInfo,
  chainPaths,
  chainTotals,
  chains,
  holdings,
  money,
  periodData,
  periods,
  portfolioTotal,
  type Chain,
  type Holding,
  type Period,
} from "./data";

function Change({ value, children }: { value: number; children?: React.ReactNode }) {
  const isUp = value >= 0;
  return (
    <HStack gap={1} vAlign="center">
      <Icon icon={isUp ? "arrowUp" : "arrowDown"} size="xsm" color={isUp ? "success" : "error"} />
      <Text hasTabularNumbers>
        {isUp ? "+" : ""}
        {value.toFixed(2)}%
      </Text>
      {children}
    </HStack>
  );
}

function PerformanceChart({ period, chain }: { period: Period; chain: Chain }) {
  const { points, ticks } = periodData[period];
  const values = points.map((point, index) =>
    point + (chain === "Solana" ? Math.sin(index * 1.2) * 2 : chain === "EVM" ? Math.cos(index * 0.9) * 3 : Math.sin(index * 1.5) * 4),
  );
  const low = Math.min(...values) - 4;
  const high = Math.max(...values) + 4;
  const coordinates = values.map((value, index) => ({
    x: 8 + (index / (values.length - 1)) * 684,
    y: 170 - ((value - low) / (high - low)) * 150,
  }));
  const line = coordinates.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const last = coordinates[coordinates.length - 1];

  return (
    <VStack gap={2}>
      <svg width="100%" height="200" viewBox="0 0 700 190" preserveAspectRatio="none" role="img" aria-label={`${chain} sample portfolio performance for ${period}, trending upward`}>
        <defs>
          <linearGradient id="orbitGrowth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[30, 75, 120, 165].map((y) => <line key={y} x1="0" x2="700" y1={y} y2={y} stroke="var(--color-border)" strokeDasharray="4 6" />)}
        <path d={`${line} L692 180 L8 180 Z`} fill="url(#orbitGrowth)" />
        <path d={line} fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <circle cx={last.x} cy={last.y} r="5" fill="var(--color-accent)" stroke="var(--color-background-card)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <HStack hAlign="between">
        {ticks.map((tick, index) => <Text key={index} type="supporting" color="secondary">{tick || " "}</Text>)}
      </HStack>
    </VStack>
  );
}

export function Dashboard({ chain }: { chain: Chain }) {
  const [period, setPeriod] = useState<Period>("30D");
  const [isHidden, setIsHidden] = useState(false);
  const [query, setQuery] = useState("");

  const visibleTotal = chainTotals[chain];
  const scopedHoldings = holdings.filter((h) => h.chain === chain);
  const filtered = useMemo(
    () =>
      scopedHoldings.filter((h) => `${h.name} ${h.symbol} ${h.chain}`.toLowerCase().includes(query.trim().toLowerCase())),
    [scopedHoldings, query],
  );
  const { sortedData, sortConfig } = useTableSortableState<Holding>({
    data: filtered,
    defaultSort: [{ sortKey: "value", direction: "descending" }],
  });
  const sortPlugin = useTableSortable<Holding>(sortConfig);

  const show = (value: number) => (isHidden ? "••••••" : money(value));
  const current = periodData[period];

  const columns: TableColumn<Holding>[] = [
    {
      key: "name",
      header: "Asset",
      width: proportional(2),
      sortable: true,
      renderCell: (row) => (
        <HStack gap={3} vAlign="center">
          <Avatar
            name={row.symbol}
            src={row.symbol === "SOL" ? chainInfo.Solana.image : row.symbol === "ETH" ? chainInfo.EVM.image : row.symbol === "SUI" ? chainInfo.Sui.image : undefined}
            size="md"
            tooltip={false}
          />
          <VStack gap={0}>
            <Text weight="semibold">{row.name}</Text>
            <Text type="supporting" color="secondary">
              {row.symbol}
            </Text>
          </VStack>
        </HStack>
      ),
    },
    {
      key: "price",
      header: "Price",
      align: "end",
      width: proportional(1),
      sortable: true,
      renderCell: (row) => <Text hasTabularNumbers>{show(row.price)}</Text>,
    },
    {
      key: "change",
      header: "24h change",
      align: "end",
      width: proportional(1),
      sortable: true,
      renderCell: (row) => (
        <HStack hAlign="end">
          <Change value={row.change} />
        </HStack>
      ),
    },
    {
      key: "quantity",
      header: "Balance",
      align: "end",
      width: proportional(1.5),
      renderCell: (row) => (
        <Text color="secondary" hasTabularNumbers>
          {isHidden ? "••••" : `${row.quantity} ${row.symbol}`}
        </Text>
      ),
    },
    {
      key: "value",
      header: "Value",
      align: "end",
      width: proportional(1),
      sortable: true,
      renderCell: (row) => (
        <Text weight="semibold" hasTabularNumbers>
          {show(row.value)}
        </Text>
      ),
    },
  ];

  return (
    <AppShell
      height="fill"
      sideNav={
        <SideNav
          header={<SideNavHeading heading="orbit." subheading={`${chain} portfolio`} />}
          footer={
            <VStack gap={1} paddingInline={2}>
              <Text weight="semibold">One network. More clarity.</Text>
              <Text type="supporting" color="secondary">
                Explore the {chain} side of your portfolio.
              </Text>
            </VStack>
          }
        >
          <SideNavSection title="Workspace">
            <SideNavItem label="Overview" icon={Squares2X2Icon} href="#overview" isSelected />
          </SideNavSection>
          <SideNavSection title="Networks">
            {chains.map((network) => (
              <SideNavItem
                key={network}
                label={network}
                href={chainPaths[network]}
                as={NextLink}
                isSelected={chain === network}
              />
            ))}
          </SideNavSection>
        </SideNav>
      }
      topNav={
        <TopNav
          label="Portfolio"
          startContent={
            <HStack gap={2} vAlign="center">
              <Text color="secondary">Portfolio</Text>
              <Icon icon="chevronRight" size="xsm" color="secondary" />
              <Text weight="semibold">{chain}</Text>
            </HStack>
          }
          endContent={
            <HStack gap={4} vAlign="center">
              <Text type="supporting" color="secondary">
                Demo data
              </Text>
              <Button label="Choose network" icon={<Icon icon={Square2StackIcon} />} href="/portfolio" as={NextLink} />
              <UserButton />
            </HStack>
          }
        />
      }
      contentPadding={6}
    >
      <VStack gap={8} maxWidth={1600}>
        {/* Page header */}
        <HStack hAlign="between" vAlign="end" gap={4} wrap="wrap">
          <VStack gap={1}>
            <Text type="label" color="accent">
              {chain.toUpperCase()} DASHBOARD
            </Text>
            <Heading level={1} id="overview">Overview</Heading>
            <Text color="secondary">{chainInfo[chain].description}. Focus on this network&apos;s assets and performance.</Text>
          </VStack>
          <Button
            label={isHidden ? "Show balances" : "Hide balances"}
            icon={<Icon icon={isHidden ? EyeIcon : "eyeSlash"} />}
            onClick={() => setIsHidden(!isHidden)}
          />
        </HStack>

        <HStack gap={2} wrap="wrap">
          {chains.map((network) => (
            <Button
              key={network}
              label={network}
              href={chainPaths[network]}
              as={NextLink}
              variant={chain === network ? "primary" : "ghost"}
              size="sm"
            />
          ))}
        </HStack>

        {/* Balance + performance */}
        <Grid columns={{ minWidth: 300, max: 3 }} gap={4}>
          <Card padding={6}>
            <VStack gap={6} height="100%" vAlign="between">
              <VStack gap={3}>
                <Text type="label" color="secondary">
                  TOTAL {chain.toUpperCase()} VALUE
                </Text>
                <Text type="body" size="4xl" weight="bold" hasTabularNumbers>
                  {show(visibleTotal)}
                </Text>
                <Change value={current.change}>
                  <Text color="secondary">
                    {isHidden ? "••••••" : `+${money(current.amount * (visibleTotal / portfolioTotal))}`} in the last {current.label}
                  </Text>
                </Change>
              </VStack>
              <Divider />
              <Text color="secondary">
                {scopedHoldings.length} assets on {chain}
              </Text>
            </VStack>
          </Card>

          <GridSpan columns={2}>
            <Card padding={6}>
              <VStack gap={4}>
                <HStack hAlign="between" vAlign="start" gap={4} wrap="wrap">
                  <VStack gap={1}>
                    <Text type="label" color="secondary">
                      PORTFOLIO PERFORMANCE
                    </Text>
                    <Heading level={2} accessibilityLevel={2} type="display-3">
                      {chain} performance
                    </Heading>
                  </VStack>
                  <SegmentedControl label="Chart period" size="sm" value={period} onChange={(v) => setPeriod(v as Period)}>
                    {periods.map((p) => (
                      <SegmentedControlItem key={p} value={p} label={p} />
                    ))}
                  </SegmentedControl>
                </HStack>
                <PerformanceChart period={period} chain={chain} />
              </VStack>
            </Card>
          </GridSpan>
        </Grid>

        {/* Asset values are part of this network's overview. */}
        <VStack gap={4}>
          <HStack hAlign="between" vAlign="end">
            <VStack gap={1}>
              <Text type="label" color="accent">
                YOUR HOLDINGS
              </Text>
              <Heading level={2}>Asset values</Heading>
            </VStack>
            <Text type="supporting" color="secondary">
              {filtered.length} of {scopedHoldings.length} assets
            </Text>
          </HStack>
          <Card padding={0}>
            <VStack padding={4}>
              <StackItem>
                <TextInput
                  type="search"
                  label="Search assets"
                  isLabelHidden
                  placeholder={`Search ${chain} assets`}
                  startIcon="search"
                  hasClear
                  value={query}
                  onChange={setQuery}
                  width={320}
                />
              </StackItem>
            </VStack>
            <Table<Holding>
              data={sortedData}
              columns={columns}
              idKey="id"
              hasHover
              plugins={{ sort: sortPlugin }}
              emptyState={
                <EmptyState
                  title="No matching assets"
                  description="Try another asset name or clear the search."
                  isCompact
                  actions={
                    <Button
                      label="Clear search"
                      variant="primary"
                      onClick={() => {
                        setQuery("");
                      }}
                    />
                  }
                />
              }
            />
            <Divider />
            <HStack hAlign="between" padding={4}>
              <Text type="supporting" color="secondary">
                Showing sample portfolio data
              </Text>
              <Text type="supporting" color="secondary">
                Values shown in USD
              </Text>
            </HStack>
          </Card>
        </VStack>

        <HStack hAlign="between" paddingBlockEnd={4}>
          <Text type="supporting" color="secondary">
            {chain} portfolio · Demo preview
          </Text>
          <Text type="supporting" color="secondary">
            {scopedHoldings.length} assets on {chain}
          </Text>
        </HStack>
      </VStack>
    </AppShell>
  );
}
