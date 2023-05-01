import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
  main: {
    background:
      theme.colorScheme == "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
  },
  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
}));
