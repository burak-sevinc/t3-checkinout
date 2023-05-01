import { createStyles, Drawer, Flex, LoadingOverlay, rem } from "@mantine/core";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { IconCheck, IconX } from "@tabler/icons-react";
import { api } from "~/utils/api";
import { notifications } from "@mantine/notifications";
import { useListState } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import ChecklistForm from "../ChecklistForm";
import type { IChecklistForm } from "~/types/checklist";

type CreateChecklistProps = {
  opened: boolean;
  close: () => void;
  setSearchTerm: (searchTerm: string) => void;
};

const useStyles = createStyles((theme) => ({
  header: {
    zIndex: 20,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export default function ChecklistDrawer({
  opened,
  close,
  setSearchTerm,
}: CreateChecklistProps) {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isChanged, setIsChanged] = useState(false);
  const [items, handlers] = useListState<string>();
  const trpc = api.useContext();

  const { mutate, isLoading, error } = api.checklist.create.useMutation({
    onSuccess: () => {
      void trpc.checklist.getAll.invalidate();
      notifications.show({
        title: t("checklist.success.create.msgTitle"),
        message: t("checklist.success.create.msgContent"),
        color: "green",
        icon: <IconCheck />,
      });
      resetDrawer();
      setSearchTerm("");
      setIsChanged(false);
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

  const form = useForm<IChecklistForm>({
    initialValues: {
      title: "",
      description: "",
      itemName: "",
      items: items,
    },
    validate: {
      title: (value) =>
        value.length < 2 ? t("checklist.error.minChar") : null,
      itemName: () => (items.length < 1 ? t("checklist.error.minItem") : null),
    },
  });
  const removeItem = (index: number) => {
    setIsChanged(true);
    handlers.remove(index);
    form.setValues({
      items: items,
    });
  };

  const prepend = (name: string) => {
    setIsChanged(true);
    if (name.length > 1) {
      handlers.append(name);
      form.setValues({ itemName: "", items: items });
    } else {
      form.setFieldError("itemName", t("checklist.error.minChar"));
    }
  };

  const submitForm = () => {
    if (items.length < 1) {
      return notifications.show({
        title: t("error"),
        message: t("checklist.error.minItem"),
        color: "red",
        icon: <IconX />,
      });
    }
    try {
      mutate({
        title: form.values.title,
        description: form.values.description,
        items: JSON.stringify(items),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resetDrawer = () => {
    form.reset();
    handlers.setState([]);
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="md"
        title={t("checklist.new")}
        scrollAreaComponent={Drawer.NativeScrollArea}
        classNames={{
          header: classes.header,
        }}
      >
        <Flex direction="column" gap="lg" my="sm">
          <ChecklistForm
            formType="create"
            form={form}
            items={items}
            prepend={prepend}
            removeItem={removeItem}
            submitForm={submitForm}
            isChanged={isChanged}
          />
        </Flex>
      </Drawer>
    </>
  );
}
