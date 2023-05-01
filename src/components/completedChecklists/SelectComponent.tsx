import { Select } from "@mantine/core";
import { useTranslation } from "next-i18next";
import type { SelectComponentProps } from "~/types/completedChecklist";

export default function SelectComponent({
  value,
  handleSelect,
  data,
}: SelectComponentProps) {
  const { t } = useTranslation();
  return (
    <Select
      value={value}
      onChange={handleSelect}
      label={t("completedChecks.create.selectLabel")}
      placeholder={t("completedChecks.create.selectPlaceholder") || ""}
      nothingFound={t("completedChecks.create.notFound")}
      data={data}
      styles={(theme) => ({
        label: {
          marginBottom: theme.spacing.xs,
        },
        item: {
          // applies styles to selected item
          "&[data-selected]": {
            "&, &:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.teal[9]
                  : theme.colors.teal[1],
              color:
                theme.colorScheme === "dark"
                  ? theme.white
                  : theme.colors.teal[9],
            },
          },

          // applies styles to hovered item (with mouse or keyboard)
          "&[data-hovered]": {},
        },
      })}
    />
  );
}
