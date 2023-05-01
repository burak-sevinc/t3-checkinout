import { Text, Container, ActionIcon, Group, Flex } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Logo from "../layout/Logo";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import useStyles from "./Footer.styles";

export default function Footer() {
  const { classes, theme } = useStyles();
  const { t } = useTranslation();
  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Flex>
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
          <Text size="xs" color="dimmed" className={classes.description}>
            {t("footer")}
          </Text>
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2023 buraksevinc.dev
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <Link href="https://github.com/burak-sevinc" target="_blank">
            <ActionIcon title="Github profile" size="lg">
              <IconBrandGithub size="1.2rem" stroke={1.5} />
            </ActionIcon>
          </Link>
          <Link
            href="https://www.linkedin.com/in/buraksevinc-dev/"
            target="_blank"
          >
            <ActionIcon title="Linkedin profile" size="lg">
              <IconBrandLinkedin size="1.3rem" stroke={1.5} />
            </ActionIcon>
          </Link>
        </Group>
      </Container>
    </footer>
  );
}
