"use client";

import { VStack, HStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Grid } from "@astryxdesign/core/Grid";
import { ClickableCard } from "@astryxdesign/core/ClickableCard";
import { Avatar } from "@astryxdesign/core/Avatar";
import { Icon } from "@astryxdesign/core/Icon";
import { chainInfo, chains, type Chain } from "./data";

export function ChainPicker({ onPick }: { onPick: (chain: Chain) => void }) {
  return (
    <VStack minHeight="100dvh" padding={8} hAlign="center">
      <VStack maxWidth={1120} width="100%" minHeight="100%" gap={10} vAlign="between">
        <Text type="display-3" weight="bold">
          orbit.
        </Text>

        <VStack gap={8}>
          <VStack gap={3} hAlign="center">
            <Text type="label" color="accent">
              YOUR PORTFOLIO STARTS HERE
            </Text>
            <Heading level={1} type="display-1" justify="center">
              Choose a chain.
            </Heading>
            <Text type="large" color="secondary" justify="center" textWrap="balance">
              Select a network to open its portfolio overview. You can switch networks at any time.
            </Text>
          </VStack>

          <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
            {chains.map((chain) => {
              const info = chainInfo[chain];
              return (
                <ClickableCard
                  key={chain}
                  label={`Open ${chain} portfolio`}
                  onClick={() => onPick(chain)}
                  padding={6}
                  elevation="low"
                >
                  <VStack gap={10} height="100%" vAlign="between">
                    <HStack hAlign="between" vAlign="start">
                      <Avatar src={info.image} name={chain} alt={`${chain} logo`} size={72} tooltip={false} />
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
              );
            })}
          </Grid>

          <Text type="supporting" color="secondary" justify="center">
            Sample portfolio data
          </Text>
        </VStack>

        <Text type="supporting" color="secondary" justify="center">
          One view. Every chain.
        </Text>
      </VStack>
    </VStack>
  );
}
