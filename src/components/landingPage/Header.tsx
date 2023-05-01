import {
  Menu,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Text,
  Flex,
  Transition,
  Paper,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLanguage } from "@tabler/icons-react";
import Logo from "../layout/Logo";
import ActionToggle from "./ActionToggle";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { signIn } from "next-auth/react";
import useStyles, { HEADER_HEIGHT } from "./Header.styles";

// interface HeaderComponentProps {
//   links: {
//     link: string;
//     label: string;
//     links?: { link: string; label: string }[];
//   }[];
// }

export function HeaderComponent() {
  const { classes, theme } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { locales } = useRouter();
  const { t } = useTranslation("common");

  const languages = locales?.map((item) => (
    <Link
      style={{
        textDecoration: "none",
      }}
      href="/"
      locale={item}
      key={item}
    >
      <Menu.Item>{item === "en" ? t("locale.en") : t("locale.tr")}</Menu.Item>
    </Link>
  ));

  const languageSwitcher = (
    <Menu
      trigger="hover"
      position="bottom"
      transitionProps={{ exitDuration: 0 }}
      withinPortal
    >
      <Menu.Target>
        <Flex>
          <Box title="Theme toggle" className={classes.languageIcon}>
            <IconLanguage size={18} />
          </Box>
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>{languages}</Menu.Dropdown>
    </Menu>
  );

  // // items commented out below are not used in the app
  // const items = links.map((link) => {
  //   const menuItems = link.links?.map((item) => (
  //     <Menu.Item key={item.link}>{item.label}</Menu.Item>
  //   ));

  //   if (menuItems) {
  //     return (
  //       <Menu
  //         key={link.label}
  //         trigger="hover"
  //         position="bottom"
  //         transitionProps={{ exitDuration: 0 }}
  //         withinPortal
  //       >
  //         <Menu.Target>
  //           <a
  //             href={link.link}
  //             className={classes.link}
  //             onClick={(event) => event.preventDefault()}
  //           >
  //             <Flex>
  //               <span className={classes.linkLabel}>{link.label}</span>
  //               <IconChevronDown size={rem(12)} stroke={1.5} />
  //             </Flex>
  //           </a>
  //         </Menu.Target>
  //         <Menu.Dropdown>{menuItems}</Menu.Dropdown>
  //       </Menu>
  //     );
  //   }

  //   return (
  //     <a
  //       key={link.label}
  //       href={link.link}
  //       className={classes.link}
  //       onClick={(event) => event.preventDefault()}
  //     >
  //       {link.label}
  //     </a>
  //   );
  // });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={0}>
      <Container fluid>
        <Flex className={classes.inner}>
          <Burger
            title="Toggle menu"
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {/* {items} */}
                <Menu>
                  <Menu.Item>
                    <Button
                      title={t("auth.signIn")}
                      radius="xl"
                      h={30}
                      onClick={() => void signIn("auth0")}
                    >
                      {t("auth.signIn")}
                    </Button>
                  </Menu.Item>
                </Menu>
              </Paper>
            )}
          </Transition>
          <Group>
            <Flex justify="center">
              <span
                style={{
                  width: "2rem",
                }}
              >
                <Logo />
              </span>
              <Flex
                style={{
                  fontWeight: 700,
                }}
              >
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
          </Group>
          {/* <Group spacing={5} className={classes.links}>
            {items}
          </Group> */}
          <Group className={classes.rightSection}>
            <Button radius="xl" h={30} onClick={() => void signIn("auth0")}>
              {t("auth.signIn")}
            </Button>
            {languageSwitcher}
            <ActionToggle />
          </Group>
          <Group spacing={4} className={classes.mobileToggle}>
            {languageSwitcher}
            <ActionToggle />
          </Group>
        </Flex>
      </Container>
    </Header>
  );
}

export default HeaderComponent;
