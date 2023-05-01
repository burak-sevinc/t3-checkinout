import React, { useState } from "react";
import {
  Button,
  Code,
  Flex,
  FocusTrap,
  Paper,
  rem,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPlus, IconSearch, IconX } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { useClickOutside, useDisclosure, useHotkeys } from "@mantine/hooks";
import ChecklistDrawer from "./create/ChecklistDrawer";
import useStyles from "./ChecklistHeader.styles";

type ChecklistHeaderProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export default function ChecklistHeader({
  searchTerm,
  setSearchTerm,
}: ChecklistHeaderProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();
  const { classes, theme } = useStyles();

  const [searchActive, setSearchActive] = useState(false);
  const ref = useClickOutside(() => setSearchActive(false));
  useHotkeys([["mod+K", () => setSearchActive(!searchActive)]]);

  const ClearSearch = () => (
    <IconX
      className={classes.clearSearchIcon}
      onClick={() => setSearchTerm("")}
      size={rem(13)}
    />
  );

  return (
    <Paper shadow="sm" my="1rem">
      <ChecklistDrawer
        setSearchTerm={setSearchTerm}
        opened={opened}
        close={close}
      />
      <Flex direction="column" gap="md" p="md">
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
          {t("checklist.header")}
        </Title>
        <Flex gap="md" align="center" justify="space-between">
          <Button
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            onClick={() => open()}
            leftIcon={<IconPlus width={rem(15)} stroke={1.5} />}
          >
            {t("create")}
          </Button>
          <FocusTrap active={searchActive}>
            <TextInput
              ref={ref}
              onChange={(event) => setSearchTerm(event.target.value)}
              value={searchTerm}
              placeholder={t("search") || "Search"}
              size="xs"
              icon={<IconSearch size="0.8rem" stroke={1.5} />}
              rightSectionWidth={80}
              rightSection={
                searchTerm ? (
                  <ClearSearch />
                ) : (
                  <Code className={classes.searchCode}>Ctrl + K</Code>
                )
              }
              styles={{
                rightSection: {
                  justifyContent: "flex-end",
                  marginRight: rem(10),
                },
              }}
            />
          </FocusTrap>
        </Flex>
      </Flex>
    </Paper>
  );
}
