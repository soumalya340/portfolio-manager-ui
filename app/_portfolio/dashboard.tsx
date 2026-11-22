"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
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
import { IconButton } from "@astryxdesign/core/IconButton";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Divider } from "@astryxdesign/core/Divider";
import { TextInput } from "@astryxdesign/core/TextInput";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { Banner } from "@astryxdesign/core/Banner";
import { Skeleton } from "@astryxdesign/core/Skeleton";
import { StatusDot } from "@astryxdesign/core/StatusDot";
import { List, ListItem } from "@astryxdesign/core/List";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { Table, proportional, useTableSortable, useTableSortableState } from "@astryxdesign/core/Table";
import type { TableColumn } from "@astryxdesign/core/Table";
import { ArrowPathIcon, EyeIcon, Square2StackIcon, Squares2X2Icon, TrashIcon, WalletIcon } from "@heroicons/react/24/outline";
import { getPortfolioHistory, getTrackedPortfolio, trackWallet, untrackWallet } from "./actions";
import { chainInfo, chainPaths, chains, money, periods, type Chain, type Period } from "./data";
import type { HoldingRow, PortfolioView, PositionRow, PositionSide } from "@/lib/portfolio-types";

const addressHint: Record<Chain, string> = {
  Solana: "Solana address, e.g. 7xKX…gAsU",
  EVM: "Ethereum address starting with 0x",
  Sui: "Sui address starting with 0x",
};

const periodLabel: Record<Period, string> = { "24H": "24 hours", "7D": "7 days", "30D": "30 days", "90D": "90 days", "1Y": "year" };

const shorten = (address: string) => (address.length > 14 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address);

/** Token amounts: more decimals for small balances, grouping for large ones. */
function amount(value: number) {
  if (value === 0) return "0";
  if (Math.abs(value) < 0.0001) return "<0.0001";
  const digits = Math.abs(value) < 1 ? 6 : Math.abs(value) < 1000 ? 4 : 2;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(value);
}

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

function tickLabel(time: number, period: Period) {
  const date = new Date(time * 1000);
  if (period === "24H") return date.toLocaleTimeString("en-US", { hour: "numeric" });
  if (period === "7D") return date.toLocaleDateString("en-US", { weekday: "short" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function PerformanceChart({ points, period, chain }: { points: { time: number; value: number }[]; period: Period; chain: Chain }) {
  const values = points.map((p) => p.value);
  const low = Math.min(...values);
  const high = Math.max(...values);
  const pad = (high - low) * 0.1 || high * 0.01 || 1;
  const coordinates = values.map((value, index) => ({
    x: 8 + (index / Math.max(values.length - 1, 1)) * 684,
    y: 170 - ((value - (low - pad)) / (high - low + pad * 2)) * 150,
  }));
  const line = coordinates.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const last = coordinates[coordinates.length - 1];
  const ticks = [0, 1, 2, 3].map((i) => points[Math.round((i / 3) * (points.length - 1))]);
  const isUp = values[values.length - 1] >= values[0];

  return (
    <VStack gap={2}>
      <svg
        width="100%"
        height="200"
        viewBox="0 0 700 190"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${chain} tracked wallets value over the last ${periodLabel[period]}, ${isUp ? "up" : "down"} from ${money(values[0])} to ${money(values[values.length - 1])}`}
      >
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
        {ticks.map((tick, index) => (
          <Text key={index} type="supporting" color="secondary">
            {tickLabel(tick.time, period)}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
}

function Sides({ sides, isHidden }: { sides: PositionSide[]; isHidden: boolean }) {
  return (
    <VStack gap={0}>
      {sides.map((side) => (
        <Text key={side.symbol} color="secondary" hasTabularNumbers>
          {isHidden ? "••••" : amount(side.amount)} {side.symbol}
        </Text>
      ))}
    </VStack>
  );
}

export function Dashboard({ chain }: { chain: Chain }) {
  const [period, setPeriod] = useState<Period>("30D");
  const [isHidden, setIsHidden] = useState(false);
  const [query, setQuery] = useState("");

  const [view, setView] = useState<PortfolioView | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [address, setAddress] = useState("");
  const [label, setLabel] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();
  const [removingId, setRemovingId] = useState<number | null>(null);

  // State is only set once the server answers, so effects never update state synchronously.
  const fetchView = useCallback(
    () =>
      getTrackedPortfolio(chain)
        .then(
          (next) => {
            setView(next);
            setLoadError(null);
          },
          (error: unknown) => setLoadError(error instanceof Error ? error.message : "Your wallets could not be loaded."),
        )
        .finally(() => setIsLoading(false)),
    [chain],
  );

  const load = () => {
    setIsLoading(true);
    return fetchView();
  };

  useEffect(() => {
    void fetchView();
  }, [fetchView]);

  // The chart prices today's amounts at past Coinbase prices. Each result is keyed to the amounts and
  // period it was fetched for, so a stale response never shows under a newer selection.
  const exposure = view?.exposure;
  const historyKey = exposure?.length ? `${period}|${JSON.stringify(exposure)}` : null;
  const [historyFor, setHistoryFor] = useState<{ key: string; points: { time: number; value: number }[] } | null>(null);
  useEffect(() => {
    if (!historyKey || !exposure) return;
    let isCurrent = true;
    getPortfolioHistory(exposure, period).then(
      (points) => isCurrent && setHistoryFor({ key: historyKey, points }),
      () => isCurrent && setHistoryFor({ key: historyKey, points: [] }),
    );
    return () => {
      isCurrent = false;
    };
  }, [historyKey, exposure, period]);
  const history = historyFor && historyFor.key === historyKey ? historyFor.points : null;

  const addWallet = () => {
    setFormError(null);
    if (!address.trim()) {
      setFormError("Enter a wallet address to track.");
      return;
    }
    startSaving(async () => {
      const result = await trackWallet(chain, address, label);
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
      setAddress("");
      setLabel("");
      await load();
    });
  };

  const removeWallet = async (id: number) => {
    setRemovingId(id);
    const result = await untrackWallet(id);
    setRemovingId(null);
    if (result.ok) await load();
    else setLoadError(result.error);
  };

  const holdings = useMemo(() => view?.holdings ?? [], [view]);
  const positions = view?.positions ?? [];
  const filtered = useMemo(
    () => holdings.filter((h) => `${h.name} ${h.symbol}`.toLowerCase().includes(query.trim().toLowerCase())),
    [holdings, query],
  );
  // Unpriced assets sort as -1 so "highest value first" keeps them at the bottom.
  const sortable = useMemo(() => filtered.map((h) => ({ ...h, sortValue: h.value ?? -1, sortPrice: h.price ?? -1 })), [filtered]);
  const { sortedData, sortConfig } = useTableSortableState<HoldingRow>({
    data: sortable,
    defaultSort: [{ sortKey: "sortValue", direction: "descending" }],
  });
  const sortPlugin = useTableSortable<HoldingRow>(sortConfig);

  const show = (value: number | null) => (value === null ? "No price" : isHidden ? "••••••" : money(value));
  const hasWallets = (view?.wallets.length ?? 0) > 0;
  const historyChange =
    history && history.length > 1 && history[0].value > 0 ? ((history[history.length - 1].value - history[0].value) / history[0].value) * 100 : null;

  const columns: TableColumn<HoldingRow>[] = [
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
      key: "sortPrice",
      header: "Price",
      align: "end",
      width: proportional(1),
      sortable: true,
      renderCell: (row) => (
        <Text hasTabularNumbers color={row.price === null ? "secondary" : undefined}>
          {row.price === null ? "No price" : money(row.price)}
        </Text>
      ),
    },
    {
      key: "change",
      header: "24h change",
      align: "end",
      width: proportional(1),
      sortable: true,
      renderCell: (row) =>
        row.change === null ? (
          <Text color="secondary">None</Text>
        ) : (
          <HStack hAlign="end">
            <Change value={row.change} />
          </HStack>
        ),
    },
    {
      key: "amount",
      header: "Balance",
      align: "end",
      width: proportional(1.5),
      sortable: true,
      renderCell: (row) => (
        <Text color="secondary" hasTabularNumbers>
          {isHidden ? "••••" : `${amount(row.amount)} ${row.symbol}`}
        </Text>
      ),
    },
    {
      key: "sortValue",
      header: "Value",
      align: "end",
      width: proportional(1),
      sortable: true,
      renderCell: (row) => (
        <Text weight="semibold" hasTabularNumbers color={row.value === null ? "secondary" : undefined}>
          {show(row.value)}
        </Text>
      ),
    },
  ];

  const positionColumns: TableColumn<PositionRow>[] = [
    {
      key: "pool",
      header: "Pool",
      width: proportional(1.5),
      renderCell: (row) => (
        <VStack gap={0}>
          <Text weight="semibold">{row.pool}</Text>
          <Text type="supporting" color="secondary">
            {row.protocol}
          </Text>
        </VStack>
      ),
    },
    {
      key: "wallet",
      header: "Wallet",
      width: proportional(1),
      renderCell: (row) => <Text color="secondary">{row.wallet}</Text>,
    },
    {
      key: "tokens",
      header: "Liquidity",
      width: proportional(1.5),
      renderCell: (row) => <Sides sides={row.tokens} isHidden={isHidden} />,
    },
    {
      key: "fees",
      header: "Unclaimed fees",
      width: proportional(1.25),
      renderCell: (row) => (row.fees.some((f) => f.amount > 0) ? <Sides sides={row.fees.filter((f) => f.amount > 0)} isHidden={isHidden} /> : <Text color="secondary">None</Text>),
    },
    {
      key: "inRange",
      header: "Range",
      width: proportional(1),
      renderCell: (row) =>
        row.inRange === null ? (
          <Text color="secondary">Full range</Text>
        ) : (
          <HStack gap={2} vAlign="center">
            <StatusDot variant={row.inRange ? "success" : "warning"} label={row.inRange ? "In range" : "Out of range"} />
            <Text>{row.inRange ? "In range" : "Out of range"}</Text>
          </HStack>
        ),
    },
    {
      key: "value",
      header: "Value",
      align: "end",
      width: proportional(1),
      renderCell: (row) => (
        <Text weight="semibold" hasTabularNumbers color={row.value === null ? "secondary" : undefined}>
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
            <SideNavItem label="Wallets" icon={WalletIcon} href="#wallets" />
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
                Prices from Coinbase
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
            <Heading level={1} id="overview">Overview</Heading>
            <Text color="secondary">{chainInfo[chain].description}. Values update each time you open this page.</Text>
          </VStack>
          <HStack gap={2}>
            <Button label="Refresh" variant="ghost" icon={<Icon icon={ArrowPathIcon} />} onClick={() => void load()} isLoading={isLoading && view !== null} />
            <Button
              label={isHidden ? "Show balances" : "Hide balances"}
              icon={<Icon icon={isHidden ? EyeIcon : "eyeSlash"} />}
              onClick={() => setIsHidden(!isHidden)}
            />
          </HStack>
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

        {loadError && <Banner status="error" title="Your wallets could not be loaded" description={loadError} endContent={<Button label="Try again" size="sm" onClick={() => void load()} />} />}

        {/* Tracked wallets: the input area and the saved list */}
        <Card padding={6}>
          <VStack gap={5}>
            <VStack gap={1}>
              <Heading level={2} id="wallets">
                Tracked wallets
              </Heading>
              <Text color="secondary">Add a {chain === "EVM" ? "Ethereum" : chain} address to include its tokens and liquidity positions. Addresses are saved to your account.</Text>
            </VStack>
            <Grid columns={{ minWidth: 220, max: 3 }} gap={3} align="end">
              <GridSpan columns={2}>
                <TextInput
                  label="Wallet address"
                  placeholder={addressHint[chain]}
                  value={address}
                  onChange={(value) => {
                    setAddress(value);
                    setFormError(null);
                  }}
                  status={formError ? { type: "error", message: formError } : undefined}
                  isDisabled={isSaving}
                  width="100%"
                />
              </GridSpan>
              <HStack gap={2} vAlign="end">
                <StackItem size="fill">
                  <TextInput label="Name (optional)" placeholder="e.g. Cold wallet" value={label} onChange={setLabel} isDisabled={isSaving} width="100%" />
                </StackItem>
                <Button label="Track wallet" variant="primary" onClick={addWallet} isLoading={isSaving} />
              </HStack>
            </Grid>

            {isLoading && !view ? (
              <VStack gap={2}>
                <Skeleton height={44} />
                <Skeleton height={44} />
              </VStack>
            ) : hasWallets ? (
              <List hasDividers edge="flush">
                {view!.wallets.map((wallet) => (
                  <ListItem
                    key={wallet.id}
                    label={wallet.label ?? shorten(wallet.address)}
                    description={
                      <Text type="supporting" color="secondary">
                        {wallet.status === "error"
                          ? wallet.error
                          : wallet.warnings.length
                            ? `${wallet.label ? `${shorten(wallet.address)}. ` : ""}${wallet.warnings.join(" ")}`
                            : wallet.label
                              ? shorten(wallet.address)
                              : "Read just now"}
                      </Text>
                    }
                    startContent={<StatusDot variant={wallet.status === "error" ? "error" : wallet.warnings.length ? "warning" : "success"} label={wallet.status === "error" ? "Could not be read" : "Read"} />}
                    endContent={
                      <HStack gap={3} vAlign="center">
                        <Text weight="semibold" hasTabularNumbers>
                          {wallet.status === "error" ? "Unavailable" : show(wallet.value)}
                        </Text>
                        <IconButton
                          label={`Stop tracking ${wallet.label ?? shorten(wallet.address)}`}
                          tooltip="Stop tracking"
                          icon={<Icon icon={TrashIcon} />}
                          variant="ghost"
                          size="sm"
                          isDisabled={removingId === wallet.id}
                          onClick={() => void removeWallet(wallet.id)}
                        />
                      </HStack>
                    }
                  />
                ))}
              </List>
            ) : (
              <EmptyState
                isCompact
                icon={<Icon icon={WalletIcon} />}
                title="No wallets yet"
                description={`Add a ${chain === "EVM" ? "Ethereum" : chain} address above to see its balances, liquidity positions, and total value.`}
              />
            )}
          </VStack>
        </Card>

        {hasWallets && view && (
          <>
            {/* Balance + performance */}
            <Grid columns={{ minWidth: 300, max: 3 }} gap={4}>
              <Card padding={6}>
                <VStack gap={6} height="100%" vAlign="between">
                  <VStack gap={3}>
                    <Text color="secondary">Total {chain} value</Text>
                    <Text type="body" size="4xl" weight="bold">
                      {show(view.total)}
                    </Text>
                    {view.change24h !== null && (
                      <Change value={view.change24h}>
                        <Text color="secondary">in the last 24 hours</Text>
                      </Change>
                    )}
                  </VStack>
                  <Divider />
                  <VStack gap={2}>
                    <HStack hAlign="between">
                      <Text color="secondary">Tokens</Text>
                      <Text hasTabularNumbers>{show(view.tokensValue)}</Text>
                    </HStack>
                    <HStack hAlign="between">
                      <Text color="secondary">Liquidity positions</Text>
                      <Text hasTabularNumbers>{show(view.positionsValue)}</Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Card>

              <GridSpan columns={2}>
                <Card padding={6}>
                  <VStack gap={4}>
                    <HStack hAlign="between" vAlign="start" gap={4} wrap="wrap">
                      <VStack gap={1}>
                        <Heading level={2} accessibilityLevel={2} type="display-3">
                          {chain} performance
                        </Heading>
                        <Text type="supporting" color="secondary">
                          Today&apos;s balances at past Coinbase prices
                          {historyChange !== null && !isHidden ? `, ${historyChange >= 0 ? "+" : ""}${historyChange.toFixed(2)}% over ${periodLabel[period]}` : ""}
                        </Text>
                      </VStack>
                      <SegmentedControl label="Chart period" size="sm" value={period} onChange={(v) => setPeriod(v as Period)}>
                        {periods.map((p) => (
                          <SegmentedControlItem key={p} value={p} label={p} />
                        ))}
                      </SegmentedControl>
                    </HStack>
                    {history === null ? (
                      <Skeleton height={224} />
                    ) : history.length > 1 ? (
                      <PerformanceChart points={history} period={period} chain={chain} />
                    ) : (
                      <EmptyState isCompact title="No price history" description="Coinbase has no history for these assets over this period." />
                    )}
                  </VStack>
                </Card>
              </GridSpan>
            </Grid>

            {/* Liquidity positions */}
            <VStack gap={4}>
              <HStack hAlign="between" vAlign="end">
                <Heading level={2}>Liquidity positions</Heading>
                <Text type="supporting" color="secondary">
                  {positions.length} {positions.length === 1 ? "position" : "positions"}
                </Text>
              </HStack>
              <Card padding={0}>
                <Table<PositionRow>
                  data={positions}
                  columns={positionColumns}
                  idKey="id"
                  emptyState={
                    <EmptyState
                      title="No liquidity positions"
                      description={`None of your tracked wallets hold ${chain === "EVM" ? "Uniswap v3" : chain === "Solana" ? "Orca Whirlpools" : "Cetus"} positions.`}
                      isCompact
                    />
                  }
                />
              </Card>
            </VStack>

            {/* Token balances across tracked wallets */}
            <VStack gap={4}>
              <HStack hAlign="between" vAlign="end">
                <Heading level={2}>Asset values</Heading>
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
                      placeholder={`Search ${chain} assets`}
                      startIcon="search"
                      hasClear
                      value={query}
                      onChange={setQuery}
                      width={320}
                    />
                  </StackItem>
                </VStack>
                <Table<HoldingRow>
                  data={sortedData}
                  columns={columns}
                  idKey="id"
                  hasHover
                  plugins={{ sort: sortPlugin }}
                  emptyState={
                    <EmptyState
                      title={holdings.length ? "No matching assets" : "No token balances"}
                      description={holdings.length ? "Try another asset name or clear the search." : "Your tracked wallets hold no tokens on this network."}
                      isCompact
                      actions={holdings.length ? <Button label="Clear search" variant="primary" onClick={() => setQuery("")} /> : undefined}
                    />
                  }
                />
                <Divider />
                <HStack hAlign="between" padding={4} gap={4} wrap="wrap">
                  <Text type="supporting" color="secondary">
                    Balances read from public {chain === "EVM" ? "Ethereum" : chain} nodes. Assets Coinbase doesn&apos;t list show no price.
                  </Text>
                  <Text type="supporting" color="secondary">
                    Priced {new Date(view.pricedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} in USD
                  </Text>
                </HStack>
              </Card>
            </VStack>
          </>
        )}
      </VStack>
    </AppShell>
  );
}
