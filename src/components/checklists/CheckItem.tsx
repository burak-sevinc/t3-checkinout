import React from "react";
import { ActionIcon, Card, Flex, Text, useMantineTheme } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

export default function CheckItem({
  name,
  index,
  removeItem,
}: {
  name: string;
  index: number;
  removeItem: (index: number) => void;
}) {
  const theme = useMantineTheme();

  return (
    <Card shadow="lg" padding="lg">
      <Flex justify="space-between" gap="lg" align="center">
        <Text
          variant="gradient"
          gradient={{
            from:
              theme.colorScheme === "dark"
                ? theme.colors.indigo[7]
                : theme.colors.indigo[5],
            to:
              theme.colorScheme === "dark"
                ? theme.colors.cyan[7]
                : theme.colors.cyan[5],
            deg: 45,
          }}
          sx={{ fontFamily: "Greycliff CF, sans-serif" }}
          ta="left"
          fz={20}
          fw={700}
          truncate
        >
          {name}
        </Text>
        <ActionIcon
          onClick={() => removeItem(index)}
          color="red"
          radius="xl"
          variant="light"
          size="sm"
        >
          <IconX />
        </ActionIcon>
      </Flex>
    </Card>
  );
}
