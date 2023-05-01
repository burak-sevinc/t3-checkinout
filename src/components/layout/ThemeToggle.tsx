import {
  Switch,
  Group,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export function ThemeToggle() {
  const colorScheme = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <Group position="center" my={30}>
      <Switch
        checked={"dark" === "dark"}
        onChange={() => colorScheme.toggleColorScheme()}
        size="md"
        onLabel={<IconSun color={theme.white} size="1rem" stroke={1.5} />}
        offLabel={
          <IconMoonStars
            color={theme.colors.gray[6]}
            size="1rem"
            stroke={1.5}
          />
        }
      />
    </Group>
  );
}
