import React from "react";
import { Button, Flex, Paper, Title, useMantineTheme } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { IconCheck } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import CompletedChecklistModal from "./CompletedChecklistModal";

export default function CompletedChecklistHeader() {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <CompletedChecklistModal opened={opened} open={open} close={close} />
      <Paper>
        <Flex p="lg" justify="space-between" align="center">
          <Title
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
            order={5}
          >
            {t("completedChecks.title")}
          </Title>
          <Button
            onClick={open}
            leftIcon={<IconCheck />}
            variant="gradient"
            gradient={{
              from:
                theme.colorScheme === "dark"
                  ? theme.colors.teal[9]
                  : theme.colors.teal[7],
              to:
                theme.colorScheme === "dark"
                  ? theme.colors.lime[7]
                  : theme.colors.lime[5],
              deg: 45,
            }}
          >
            {t("create")}
          </Button>
        </Flex>
      </Paper>
    </>
  );
}
