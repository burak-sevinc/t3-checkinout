import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
  group: {
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      justifyContent: "center",
      textAlign: "center",
    },
  },
  iconOpened: {
    rotate: "270deg",
  },
  iconClosed: {
    rotate: "0deg",
  },
  menu: {
    width: "50rem",
  },
  link: {
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
  },
}));
