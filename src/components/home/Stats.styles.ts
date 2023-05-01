import { createStyles, rem } from "@mantine/core";

export default createStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage:
      theme.colorScheme === "dark"
        ? `linear-gradient(90deg, ${theme.colors.blue[9]} 0%, ${theme.colors.cyan[9]} 100%)`
        : `linear-gradient(-60deg, ${theme.colors.blue[4]} 0%, ${theme.colors.blue[7]} 100%)`,
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    borderRadius: theme.radius.md,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  title: {
    color: theme.white,
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.sm,
  },

  link: {
    textDecoration: "none",
  },
  icon: {
    color: theme.white,
    "&:hover": {
      color: theme.colors.green[4],
    },
  },
  count: {
    color: theme.white,
    fontSize: rem(32),
    lineHeight: 1,
    fontWeight: 700,
    marginBottom: theme.spacing.md,
  },

  description: {
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    marginTop: rem(5),
  },

  stat: {
    flex: 1,

    "& + &": {
      paddingLeft: theme.spacing.xl,
      marginLeft: theme.spacing.xl,
      borderLeft: `${rem(1)} solid ${theme.colors.blue[3]}`,

      [theme.fn.smallerThan("sm")]: {
        paddingLeft: 0,
        marginLeft: 0,
        borderLeft: 0,
        paddingTop: theme.spacing.xl,
        marginTop: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colors.blue[3]}`,
      },
    },
  },
}));
