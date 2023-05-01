import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { UnstyledButton, Group, Avatar, Text, Menu } from "@mantine/core";
import {
  IconChevronRight,
  IconLanguage,
  IconLogout,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useStyles from "./User.styles";

export default function User() {
  const [opened, setOpened] = useState(false);
  const { t } = useTranslation();
  const { data: sessionData } = useSession();
  const { classes } = useStyles();
  const { locale, locales } = useRouter();
  const languages = locales?.map((item, index) => (
    <Link className={classes.link} href="/" key={index} locale={item}>
      <Menu.Item icon={<IconLanguage size={14} />} disabled={locale === item}>
        {t("locale." + item)}
      </Menu.Item>
    </Link>
  ));

  return (
    <Menu
      position="top"
      withArrow
      arrowPosition="center"
      shadow="md"
      width={200}
      onChange={setOpened}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group className={classes.group}>
            <Avatar src={sessionData?.user.image} radius="xl" />
            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {sessionData?.user.name}
              </Text>

              <Text color="dimmed" size="xs">
                {sessionData?.user.email}
              </Text>
            </div>
            {
              <IconChevronRight
                className={opened ? classes.iconOpened : classes.iconClosed}
                size="0.9rem"
                stroke={1.5}
              />
            }
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t("locale.language")}</Menu.Label>
        {languages}
        <Menu.Divider />
        <Menu.Item
          icon={<IconLogout size={14} />}
          onClick={() => void signOut()}
        >
          {t("auth.signOut")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
