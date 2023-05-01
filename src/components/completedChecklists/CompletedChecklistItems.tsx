import React from "react";
import { Card, Flex, Text, useMantineTheme } from "@mantine/core";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import type { ICheckItems } from "~/types/completedChecklist";

const jsonParser = (items: string) => {
  return JSON.parse(items) as ICheckItems[];
};

export default function CompletedChecklistItems({ items }: { items: string }) {
  const itemList = jsonParser(items);
  const theme = useMantineTheme();
  return (
    <Flex gap="md" direction="column">
      {itemList.map((item, index) => (
        <Card
          key={index}
          withBorder
          padding="lg"
          style={{
            zIndex: -1,
          }}
        >
          <Flex gap="md" align="center">
            {item.checked ? (
              <IconCircleCheckFilled
                style={{
                  color: theme.colors.green[6],
                }}
                size={20}
              />
            ) : (
              <IconCircleXFilled
                style={{
                  color: theme.colors.red[6],
                }}
                size={20}
              />
            )}
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
              {item.name}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}
