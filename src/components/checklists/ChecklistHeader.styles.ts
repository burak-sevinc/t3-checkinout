import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
  paper: {
    padding: theme.spacing.md,
  },
  clearSearchIcon: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[2],
    borderRadius: theme.spacing.xs,
    "&:hover": {
      color: theme.colors.red[5],
    },
  },
  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },
}));
