import React from "react";
import { api } from "~/utils/api";
import { Text, Space } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { IconArrowBigRightLine } from "@tabler/icons-react";
import Link from "next/link";
import useStyles from "./Stats.styles";

export default function Stats() {
  const { data: checklistCount } = api.checklist.getCount.useQuery();
  const { data: completedChecklistCount } =
    api.completedChecklist.getCount.useQuery();
  const { t } = useTranslation();
  const { classes, theme } = useStyles();

  const statData = [
    {
      title: t("home.stats.checklist.title"),
      description: t("home.stats.checklist.description"),
      count: checklistCount?.result,
      href: "/checklists",
    },
    {
      title: t("home.stats.completedChecks.title"),
      description: t("home.stats.completedChecks.description"),
      count: completedChecklistCount?.result,
      href: "/completed",
    },
  ];

  const stat = statData.map((stat, index) => (
    <div key={index} className={classes.stat}>
      <Link href={stat.href} className={classes.link}>
        <Text className={classes.count}>{stat.count}</Text>
        <Text className={classes.title}>{stat.title}</Text>
        <Text className={classes.description}>{stat.description}</Text>
        <Space h={theme.spacing.md} />
        <IconArrowBigRightLine size={48} className={classes.icon} />
      </Link>
    </div>
  ));

  return <div className={classes.root}>{stat}</div>;
}
