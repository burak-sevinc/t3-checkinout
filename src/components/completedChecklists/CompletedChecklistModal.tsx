import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  LoadingOverlay,
  Modal,
  rem,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useTranslation } from "next-i18next";
import { IconCheck, IconX } from "@tabler/icons-react";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { useListState } from "@mantine/hooks";
import SelectComponent from "./SelectComponent";
import type { ICheckItems, ISelectDataItem } from "~/types/completedChecklist";

type CompletedChecklistModalProps = {
  opened: boolean;
  open: () => void;
  close: () => void;
};

export default function CompletedChecklistModal({
  opened,
  close,
}: CompletedChecklistModalProps) {
  const { t } = useTranslation();
  const [note, setNote] = useState("");
  const [value, setValue] = useState<string>("");
  const [selectItems, setSelectItems] = useState<ISelectDataItem[]>([]);
  const [items, handlers] = useListState<ICheckItems>();
  const trpc = api.useContext();
  const theme = useMantineTheme();

  const { mutate, isLoading, error } =
    api.completedChecklist.create.useMutation({
      onSuccess: () => {
        void trpc.completedChecklist.getAll.invalidate();
        notifications.show({
          title: t("completedChecks.success.create.msgTitle"),
          message: t("completedChecks.success.create.msgContent"),
          color: "green",
          icon: <IconCheck />,
        });
        resetDrawer();
        return close();
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: error?.message,
          color: "red",
          icon: <IconX />,
        });
      },
    });

  const { data: checklists } = api.checklist.getAll.useQuery({});

  useEffect(() => {
    setSelectItems([]);
    checklists?.result.map((item, index) => {
      const selectItem: ISelectDataItem = {
        key: index,
        value: item.id.toString(),
        label: item.title,
      };
      setSelectItems((prev) => [...prev, selectItem]);
    });
  }, [checklists]);

  const submitForm = () => {
    try {
      mutate({
        checklistId: parseInt(value),
        note: note,
        items: JSON.stringify(items),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetDrawer = () => {
    setValue("");
    handlers.setState([]);
    setNote("");
  };

  const handleSelect = (value: string) => {
    setValue(value);
    checklists?.result.map((checklist) => {
      if (checklist.id.toString() === value) {
        handlers.setState([]);
        const checklistItems = JSON.parse(
          checklist.items as string
        ) as string[];
        checklistItems.map((item) => {
          handlers.append({ id: item, name: item, checked: false });
        });
      }
    });
  };

  const handleCheckbox = (id: string) => {
    handlers.apply((item): typeof item => {
      if (item.id === id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Modal
        size="xl"
        centered
        opened={opened}
        onClose={close}
        title={t("completedChecks.create.title")}
        styles={{
          header: {
            zIndex: 20,
            borderBottom: `${rem(1)} solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[2]
            }`,
          },
          title: { fontSize: rem(20), fontWeight: 700 },
        }}
        padding="lg"
      >
        <Flex direction="column" gap="md" mih={rem(600)} mt="md">
          <SelectComponent
            value={value}
            handleSelect={handleSelect}
            data={selectItems}
          />

          {items.map((item, index) => (
            <Checkbox
              p="lg"
              key={"checklistItem" + index.toString()}
              onChange={() => handleCheckbox(item.name)}
              checked={item.checked}
              label={item.name}
              color="green"
              style={{}}
              radius="xl"
            />
          ))}
          {value && (
            <>
              <Textarea
                placeholder="..."
                label={t("completedChecks.create.note")}
                description={t("optional")}
                value={note}
                maxLength={255}
                autosize
                maxRows={4}
                onChange={(event) => setNote(event.currentTarget.value)}
              />
              <Button type="button" onClick={submitForm}>
                {t("create")}
              </Button>
            </>
          )}
        </Flex>
      </Modal>
    </>
  );
}
