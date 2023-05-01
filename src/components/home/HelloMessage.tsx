import {
  Avatar,
  Flex,
  Group,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { useTranslation } from "next-i18next";

export default function HelloMessage({
  username,
  photo,
}: {
  username: string;
  photo: string;
}) {
  const { t } = useTranslation("common");
  const theme = useMantineTheme();
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      style={{
        width: "100%",
      }}
    >
      <Flex direction="column" gap={theme.spacing.md}>
        <Text fw="bold" c="dimmed">
          {t("home.hello")},
        </Text>
        <Group position="left" spacing="md">
          <Avatar src={photo} alt={username} size="lg" />

          <Text
            variant="h1"
            color={
              theme.colorScheme === "dark"
                ? theme.colors.blue[5]
                : theme.colors.blue[7]
            }
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            fz="xl"
            fw={700}
          >
            {username}
          </Text>
        </Group>
      </Flex>
    </Paper>
  );
}
