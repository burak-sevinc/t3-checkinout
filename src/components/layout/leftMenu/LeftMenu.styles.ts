// MyComponent.styles.ts
import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  // add all styles as usual
  link: {
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    borderRadius: theme.radius.md,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      fontSize: theme.fontSizes.sm,
    },
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      fontSize: theme.fontSizes.xl,
    },
    div: {
      padding: "0.2rem 1rem 0.2rem 1rem",
    },
    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.gray[7]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  linkActive: {
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.blue[5] : theme.colors.blue[7],
    borderRadius: theme.radius.md,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.sm,
    fontSize: theme.fontSizes.md,
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      fontSize: theme.fontSizes.sm,
    },
    [`@media (max-width: ${theme.breakpoints.sm})`]: {
      fontSize: theme.fontSizes.xl,
    },
    div: {
      padding: "0.2rem 1rem 0.2rem 1rem",
    },
    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.gray[7]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));
