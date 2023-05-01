import Link from "next/link";
import { IconChecks, IconHome2, IconListDetails } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import useStyles from "./LeftMenu.styles";
import { useRouter } from "next/router";

export default function LeftMenu() {
  const { t } = useTranslation("common");
  const { classes } = useStyles();
  const { pathname } = useRouter();

  const path = pathname.split("/")[1];
  const links = [
    {
      name: "",
      href: "/",
      label: t("links.home"),
      icon: <IconHome2 size={"1rem"} stroke={1.5} />,
    },
    {
      name: "completed",
      href: "/completed",
      label: t("links.completedChecks"),
      icon: <IconChecks size={"1rem"} stroke={1.5} />,
    },
    {
      name: "checklists",
      href: "/checklists",
      label: t("links.checklists"),
      icon: <IconListDetails size={"1rem"} stroke={1.5} />,
    },
  ];

  return (
    <>
      {links.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={item.name === path ? classes.linkActive : classes.link}
        >
          <div>{item.icon}</div>
          {item.label}
        </Link>
      ))}
    </>
  );
}
