import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `${rem(3)} solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
  textLink: {
    cursor: "pointer",
    color: theme.colors.blue[7],
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
