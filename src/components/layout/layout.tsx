import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import LeftMenu from "./leftMenu/LeftMenu";
import { ThemeToggle } from "./ThemeToggle";
import User from "./user/User";
import useStyles from "./Layout.styles";
import { useRouter } from "next/router";
import Logo from "./Logo";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { asPath } = useRouter();
  useEffect(() => {
    setOpened(false);
  }, [asPath]);
  return (
    <AppShell
      className={classes.main}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, md: 300 }}
        >
          <Navbar.Section grow>
            <LeftMenu />
          </Navbar.Section>
          <Navbar.Section className={classes.footer}>
            <User />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header className={classes.header} height={{ base: 80, md: 80 }} p="md">
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>

          <Flex align="center" gap={theme.spacing.md}>
            <span
              style={{
                width: "2rem",
              }}
            >
              <Logo />
            </span>
            <Flex style={{
              fontWeight: 700,
            }}>
              <Text
                color={
                  theme.colorScheme === "dark"
                    ? theme.white
                    : theme.colors.gray[8]
                }
              >
                Check
              </Text>
              <Text
                color={
                  theme.colorScheme === "dark"
                    ? theme.colors.lime[4]
                    : theme.colors.green[5]
                }
              >
                In
              </Text>
              <Text
                color={
                  theme.colorScheme === "dark"
                    ? theme.colors.blue[2]
                    : theme.colors.blue[4]
                }
              >
                Out
              </Text>
            </Flex>
          </Flex>
          <ThemeToggle />
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
