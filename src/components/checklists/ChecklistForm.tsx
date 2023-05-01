import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Popover,
  TextInput,
  Textarea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import CheckItem from "./CheckItem";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import type { UseFormReturnType } from "@mantine/form";
import type { IChecklistForm } from "~/types/checklist";

export default function ChecklistForm({
  formType,
  form,
  items,
  prepend,
  removeItem,
  submitForm,
  isChanged,
}: {
  formType: "create" | "update";
  form: UseFormReturnType<IChecklistForm>;
  items: string[];
  prepend: (name: string) => void;
  removeItem: (index: number) => void;
  submitForm: () => void;
  isChanged: boolean;
}) {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      style={{
        background:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      }}
    >
      <form onSubmit={form.onSubmit(submitForm)}>
        <Card.Section inheritPadding>
          <Flex direction="column" gap="lg" my="sm">
            <TextInput
              label={t("checklist.title")}
              placeholder={t("checklist.titlePlaceholder") || ""}
              description={t("checklist.titleDescription")}
              withAsterisk
              error={form.errors.title}
              minLength={2}
              maxLength={170}
              rightSectionWidth={42}
              {...form.getInputProps("title")}
            />

            <Textarea
              maxLength={170}
              placeholder={t("checklist.descriptionPlaceholder") || ""}
              label={t("checklist.descriptionLabel")}
              {...form.getInputProps("description")}
              error={form.errors.description}
            />

            <TextInput
              label={t("checklist.itemName")}
              placeholder={t("checklist.itemPlaceholder") || ""}
              description={t("checklist.itemDescription")}
              withAsterisk
              error={form.errors}
              minLength={2}
              maxLength={170}
              {...form.getInputProps("itemName")}
              rightSection={
                <Popover
                  opened={form.errors.itemName ? true : false}
                  width="max-content"
                  position="top"
                  withArrow
                  shadow="md"
                >
                  <Popover.Target>
                    <ActionIcon
                      variant="gradient"
                      gradient={{ from: "indigo", to: "cyan" }}
                      color={theme.primaryColor}
                      onClick={() => prepend(form.values.itemName)}
                    >
                      <IconPlus />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <span style={{
                      fontSize: rem(12),
                    }}>{t("useMe")} 🥹</span>
                  </Popover.Dropdown>
                </Popover>
              }
              rightSectionWidth={42}
            />
          </Flex>
        </Card.Section>
        <Box my="lg">
          <Flex direction="column" gap="lg">
            {items.map((item: string, index: number) => (
              <CheckItem
                key={index}
                name={item}
                index={index}
                removeItem={() => removeItem(index)}
              />
            ))}
            <Button
              type="submit"
              disabled={form.isDirty() ? false : isChanged ? false : true}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              leftIcon={
                formType === "create" ? (
                  <IconPlus size={rem(15)} stroke={1.2} />
                ) : (
                  <IconCheck size={rem(15)} stroke={1.2} />
                )
              }
            >
              {formType === "create" ? t("create") : t("update")}
            </Button>
          </Flex>
        </Box>
      </form>
    </Card>
  );
}
