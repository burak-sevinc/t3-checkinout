import React from "react";
import { Flex, LoadingOverlay, Skeleton } from "@mantine/core";

export default function LandingPageSkeleton() {
  return (
    <>
      <LoadingOverlay visible overlayBlur={2} />
      <Skeleton h={60} />
      <Flex mt={10} direction="column" gap={10}>
        <Skeleton h={500} />
        <Skeleton h={350} />
      </Flex>
    </>
  );
}
