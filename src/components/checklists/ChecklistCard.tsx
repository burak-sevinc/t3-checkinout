import { useState } from "react";
import Link from "next/link";
import { api } from "~/utils/api";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  LoadingOverlay,
  Modal,
  Text,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCheckbox,
  IconEdit,
  IconTrashX,
  IconTrashXFilled,
} from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import type { Prisma } from "@prisma/client";
interface IChecklistCard {
  id: number;
  title: string;
  description?: string;
  items: Prisma.JsonValue;
}
export default function ChecklistCard({
  id,
  title,
  description,
  items,
}: IChecklistCard) {
  const [modalOpened, setModalOpened] = useState(false);
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const trpc = api.useContext();
  const itemList = JSON.parse(items as string) as string[];
  const limitedList: string[] = [];
  for (let index = 0; index < itemList.length; index++) {
    if (index > 4) {
      limitedList.push("...");
      break;
    }
    limitedList.push(itemList[index] as string);
  }

  const {
    isLoading,
    mutate: deleteMutation,
    error,
  } = api.checklist.delete.useMutation({
    onSuccess: () => {
      notifications.show({
        title: t("checklist.success.delete.msgTitle"),
        message: t("checklist.success.delete.msgContent"),
        color: "green",
        icon: <IconCheck />,
      });
      void trpc.checklist.getAll.invalidate();
      setModalOpened(false);
    },
    onError: () => {
      console.log(error);
    },
  });

  const handleDelete = () => {
    deleteMutation({
      checklistId: id,
    });
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(!modalOpened)}
        title={t("deleteConfirm.title")}
        centered
      >
        <Flex direction="column">
          <Text c="dimmed">{t("deleteConfirm.message")}</Text>
          <Flex justify="flex-end">
            <Button
              onClick={handleDelete}
              leftIcon={<IconTrashXFilled />}
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
            >
              {t("delete")}
            </Button>
          </Flex>
        </Flex>
      </Modal>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section inheritPadding>
          <Flex
            py="md"
            direction="row"
            gap="md"
            justify="space-between"
            align="center"
          >
            <Text
              variant="gradient"
              gradient={{
                from:
                  theme.colorScheme === "dark"
                    ? theme.colors.blue[5]
                    : theme.colors.blue[8],
                to:
                  theme.colorScheme === "dark"
                    ? theme.colors.cyan[5]
                    : theme.colors.cyan[8],
                deg: 45,
              }}
              fw={700}
              fz={23}
              truncate
            >
              {title}
            </Text>
            <Flex gap={theme.spacing.xs}>
              <Link
                href={`/checklists/${id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <ActionIcon variant="light">
                  <IconEdit size={rem(20)} stroke={1.5} />
                </ActionIcon>
              </Link>
              <ActionIcon
                onClick={() => setModalOpened(!modalOpened)}
                variant="subtle"
                color="red"
              >
                <IconTrashX size={rem(20)} stroke={1.5} />
              </ActionIcon>
            </Flex>
          </Flex>
          <Divider size="xs" />
          <Text
            size="sm"
            c={
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : theme.colors.dark[5]
            }
            fw={600}
            truncate
            mt={theme.spacing.md}
          >
            {description}
          </Text>
          <Flex gap="md" wrap="wrap" my="md">
            {limitedList.map((item, index) => (
              <Badge
                key={index}
                variant="gradient"
                gradient={{
                  from:
                    theme.colorScheme === "dark"
                      ? theme.colors.teal[9]
                      : theme.colors.teal[6],
                  to:
                    theme.colorScheme === "dark"
                      ? theme.colors.lime[9]
                      : theme.colors.lime[6],
                  deg: 105,
                }}
                styles={{
                  leftSection: {
                    display: "flex",
                  },
                }}
                leftSection={<IconCheckbox size={"0.8rem"} stroke={1.5} />}
              >
                {item}
              </Badge>
            ))}
          </Flex>
        </Card.Section>
      </Card>
    </>
  );
}
