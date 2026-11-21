"use client";

import { useMemo, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { AppShell } from "@astryxdesign/core/AppShell";
import { SideNav, SideNavHeading, SideNavItem, SideNavSection } from "@astryxdesign/core/SideNav";
import { TopNav } from "@astryxdesign/core/TopNav";
import { VStack, HStack, StackItem } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Card } from "@astryxdesign/core/Card";
import { SelectableCard } from "@astryxdesign/core/SelectableCard";
import { Grid, GridSpan } from "@astryxdesign/core/Grid";
import { Icon } from "@astryxdesign/core/Icon";
import { Button } from "@astryxdesign/core/Button";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Divider } from "@astryxdesign/core/Divider";
import { ProgressBar } from "@astryxdesign/core/ProgressBar";
import { TextInput } from "@astryxdesign/core/TextInput";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Table, proportional, useTableSortable, useTableSortableState } from "@astryxdesign/core/Table";
import type { TableColumn } from "@astryxdesign/core/Table";
import { ChartBarIcon, EyeIcon, Square2StackIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import {
  chainInfo,
  chainTotals,
  chains,
  filters,
  holdings,
  money,
  periodData,
  periods,
  portfolioTotal,
  type Chain,
  type Filter,
  type Holding,
  type Period,
} from "./data";

type Section = "overview" | "networks" | "assets";

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

function PerformanceChart({ period, filter }: { period: Period; filter: Filter }) {
  const { points, ticks } = periodData[period];
  const values = points.map((point, index) =>
    point + (filter === "Solana" ? Math.sin(index * 1.2) * 2 : filter === "EVM" ? Math.cos(index * 0.9) * 3 : filter === "Sui" ? Math.sin(index * 1.5) * 4 : 0),
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
      <svg width="100%" height="200" viewBox="0 0 700 190" preserveAspectRatio="none" role="img" aria-label={`${filter} sample portfolio performance for ${period}, trending upward`}>
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

export function Dashboard({
  filter,
  onFilterChange,
  onChooseChain,
}: {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onChooseChain: () => void;
}) {
  const [period, setPeriod] = useState<Period>("30D");
  const [isHidden, setIsHidden] = useState(false);
  const [query, setQuery] = useState("");
  const [section, setSection] = useState<Section>("overview");

  const visibleTotal = filter === "All chains" ? portfolioTotal : chainTotals[filter];
  const scopedHoldings = filter === "All chains" ? holdings : holdings.filter((h) => h.chain === filter);
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
      key: "chain",
      header: "Network",
      width: proportional(1),
      sortable: true,
      renderCell: (row) => (
        <HStack gap={2} vAlign="center">
          <Avatar src={chainInfo[row.chain].image} name={row.chain} alt={`${row.chain} logo`} size="sm" tooltip={false} />
          <Text>{row.chain}</Text>
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

  const navItem = (id: Section, label: string, icon: typeof Squares2X2Icon) => (
    <SideNavItem label={label} icon={icon} href={`#${id}`} isSelected={section === id} onClick={() => setSection(id)} />
  );

  return (
    <AppShell
      height="fill"
      sideNav={
        <SideNav
          header={<SideNavHeading heading="orbit." subheading="Multichain portfolio" />}
          footer={
            <VStack gap={1} paddingInline={2}>
              <Text weight="semibold">One view. Every chain.</Text>
              <Text type="supporting" color="secondary">
                Track your assets across your favorite ecosystems.
              </Text>
            </VStack>
          }
        >
          <SideNavSection title="Workspace">
            {navItem("overview", "Overview", Squares2X2Icon)}
            {navItem("networks", "Networks", Square2StackIcon)}
            {navItem("assets", "Assets", ChartBarIcon)}
          </SideNavSection>
        </SideNav>
      }
      topNav={
        <TopNav
          label="Portfolio"
          startContent={
            <HStack gap={2} vAlign="center">
              <Text color="secondary">Workspace</Text>
              <Icon icon="chevronRight" size="xsm" color="secondary" />
              <Text weight="semibold">Overview</Text>
            </HStack>
          }
          endContent={
            <HStack gap={4} vAlign="center">
              <Text type="supporting" color="secondary">
                Demo data
              </Text>
              <Button label="Choose chain" icon={<Icon icon={Square2StackIcon} />} onClick={onChooseChain} />
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
              YOUR DASHBOARD
            </Text>
            <Heading level={1} id="overview">Portfolio overview</Heading>
            <Text color="secondary">All your assets, across every chain, in one clear view.</Text>
          </VStack>
          <Button
            label={isHidden ? "Show balances" : "Hide balances"}
            icon={<Icon icon={isHidden ? EyeIcon : "eyeSlash"} />}
            onClick={() => setIsHidden(!isHidden)}
          />
        </HStack>

        <SegmentedControl label="Filter portfolio by network" value={filter} onChange={(v) => onFilterChange(v as Filter)}>
          {filters.map((f) => (
            <SegmentedControlItem key={f} value={f} label={f} />
          ))}
        </SegmentedControl>

        {/* Balance + performance */}
        <Grid columns={{ minWidth: 300, max: 3 }} gap={4}>
          <Card padding={6}>
            <VStack gap={6} height="100%" vAlign="between">
              <VStack gap={3}>
                <Text type="label" color="secondary">
                  TOTAL PORTFOLIO VALUE
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
                Across {filter === "All chains" ? "3 networks" : "1 network"} · {scopedHoldings.length} assets
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
                      Growth over time
                    </Heading>
                  </VStack>
                  <SegmentedControl label="Chart period" size="sm" value={period} onChange={(v) => setPeriod(v as Period)}>
                    {periods.map((p) => (
                      <SegmentedControlItem key={p} value={p} label={p} />
                    ))}
                  </SegmentedControl>
                </HStack>
                <PerformanceChart period={period} filter={filter} />
              </VStack>
            </Card>
          </GridSpan>
        </Grid>

        {/* Networks */}
        <VStack gap={4}>
          <HStack hAlign="between" vAlign="end">
            <VStack gap={1}>
              <Text type="label" color="accent">
                THE BIG PICTURE
              </Text>
              <Heading level={2} id="networks">Across your networks</Heading>
            </VStack>
            <Text type="supporting" color="secondary">
              3 networks in demo
            </Text>
          </HStack>
          <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
            {chains.map((chain: Chain) => {
              const share = (chainTotals[chain] / portfolioTotal) * 100;
              const isSelected = filter === chain;
              return (
                <SelectableCard
                  key={chain}
                  label={`${chain} network`}
                  isSelected={isSelected}
                  onChange={(selected) => onFilterChange(selected ? chain : "All chains")}
                  padding={5}
                >
                  <VStack gap={4}>
                    <HStack hAlign="between" vAlign="center">
                      <Avatar src={chainInfo[chain].image} name={chain} alt={`${chain} logo`} size="lg" tooltip={false} />
                      <Icon icon="chevronRight" color="secondary" />
                    </HStack>
                    <VStack gap={1}>
                      <Text color="secondary">{chain}</Text>
                      <Text type="body" size="2xl" weight="bold" hasTabularNumbers>
                        {show(chainTotals[chain])}
                      </Text>
                    </VStack>
                    <HStack hAlign="between">
                      <Text type="supporting" color="secondary">
                        {share.toFixed(1)}% of portfolio
                      </Text>
                      <Text type="supporting" color="secondary">
                        {holdings.filter((h) => h.chain === chain).length} assets
                      </Text>
                    </HStack>
                    <ProgressBar label={`${chain} share of portfolio`} isLabelHidden value={share} />
                  </VStack>
                </SelectableCard>
              );
            })}
          </Grid>
        </VStack>

        {/* Assets */}
        <VStack gap={4}>
          <HStack hAlign="between" vAlign="end">
            <VStack gap={1}>
              <Text type="label" color="accent">
                YOUR HOLDINGS
              </Text>
              <Heading level={2} id="assets">Assets</Heading>
            </VStack>
            <Text type="supporting" color="secondary">
              {filtered.length} of {holdings.length} assets
            </Text>
          </HStack>
          <Card padding={0}>
            <VStack padding={4}>
              <StackItem>
                <TextInput
                  type="search"
                  label="Search assets"
                  isLabelHidden
                  placeholder="Search assets or networks"
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
                  description="Try another asset name or switch to all chains."
                  isCompact
                  actions={
                    <Button
                      label="Clear filters"
                      variant="primary"
                      onClick={() => {
                        setQuery("");
                        onFilterChange("All chains");
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
            Orbit portfolio · Demo preview
          </Text>
          <Text type="supporting" color="secondary">
            Solana · EVM · Sui
          </Text>
        </HStack>
      </VStack>
    </AppShell>
  );
}
