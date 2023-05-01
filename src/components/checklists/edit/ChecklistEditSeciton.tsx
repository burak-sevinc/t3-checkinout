import React, { useState } from "react";
import { Grid, LoadingOverlay } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { api } from "~/utils/api";
import { useListState } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import ChecklistForm from "../ChecklistForm";
import type { Checklist } from "@prisma/client";
import type { IChecklistForm } from "~/types/checklist";

export default function ChecklistEditSeciton({
  checklist,
}: {
  checklist: Checklist;
}) {
  const { t } = useTranslation();
  const itemList = JSON.parse(checklist?.items as string) as string[];
  const [isChanged, setIsChanged] = useState(false);
  const [items, handlers] = useListState(itemList);
  const trpc = api.useContext();
  const {
    isLoading,
    mutate: updateMutation,
    error,
  } = api.checklist.updateChecklist.useMutation({
    onSuccess: () => {
      notifications.show({
        title: t("checklist.success.update.msgTitle"),
        message: t("checklist.success.update.msgContent"),
        color: "green",
        icon: <IconCheck />,
      });
      void trpc.checklist.getAll.invalidate();
      void trpc.checklist.getChecklist.invalidate();
    },
    onError: () => {
      notifications.show({
        title: t("error"),
        message: error?.message,
        color: "red",
        icon: <IconX />,
      });
    },
  });

  const form = useForm<IChecklistForm>({
    initialValues: {
      title: checklist.title,
      description: checklist.description,
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

    updateMutation({
      id: checklist.id,
      title: form.values.title,
      description: form.values.description,
      items: JSON.stringify(items),
    });
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Grid>
        <Grid.Col sm={12} md={8} lg={6}>
          <ChecklistForm
            formType="update"
            form={form}
            items={items}
            prepend={prepend}
            removeItem={removeItem}
            submitForm={submitForm}
            isChanged={isChanged}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
