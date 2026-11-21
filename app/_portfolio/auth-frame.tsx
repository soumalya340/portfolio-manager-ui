import { Suspense } from "react";
import { VStack } from "@astryxdesign/core/Layout";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Card } from "@astryxdesign/core/Card";

export function AuthFrame({ intro, loading, children }: { intro: string; loading: string; children: React.ReactNode }) {
  return (
    <VStack minHeight="100dvh" padding={8} gap={6} hAlign="center" vAlign="center">
      <VStack gap={2} hAlign="center">
        <Heading level={1} weight="bold">
          orbit.
        </Heading>
        <Text color="secondary" justify="center">
          {intro}
        </Text>
      </VStack>
      <Suspense
        fallback={
          <Card width={400} minHeight={350}>
            <Text color="secondary">{loading}</Text>
          </Card>
        }
      >
        {children}
      </Suspense>
    </VStack>
  );
}
