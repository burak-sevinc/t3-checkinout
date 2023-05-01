import React from "react";
import {
  Drawer,
  Flex,
  Text,
  useMantineTheme,
  rem,
  Blockquote,
  LoadingOverlay,
} from "@mantine/core";
import { api } from "~/utils/api";
import CompletedChecklistItems from "./CompletedChecklistItems";
import { IconCalendarTime } from "@tabler/icons-react";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import "moment/locale/tr";

type ShowCompletedCheclistDrawerProps = {
  selectedChecklistId: number | undefined;
  drawerOpened: boolean;
  setDrawerOpened: (value: boolean) => void;
  setDrawerIsLoading: (value: boolean) => void;
};
export default function ShowCompletedChecklistDrawer({
  selectedChecklistId,
  drawerOpened,
  setDrawerOpened,
  setDrawerIsLoading,
}: ShowCompletedCheclistDrawerProps) {
  const { locale } = useRouter();
  const { data: sessionData } = useSession();

  const theme = useMantineTheme();
  const { data: completedChecklist, status } =
    api.completedChecklist.getChecklist.useQuery(
      {
        id: selectedChecklistId as number,
      },
      {
        enabled: !!selectedChecklistId,
      }
    );

  status === "success" && setDrawerIsLoading(false);
  
  return (
    <>
      {status === "loading" && <LoadingOverlay visible={false} />}

      {status === "success" && (
        <Drawer
          position="right"
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          title={completedChecklist.result?.Checklist.title}
          styles={{
            header: {
              borderBottom: `${rem(1)} solid ${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[5]
                  : theme.colors.gray[2]
              }`,
            },
            title: {
              fontSize: rem(18),
              fontWeight: 800,
            },
          }}
        >
          <Flex direction="column" gap="md" mt={rem(10)}>
            <Flex direction="column" gap={theme.spacing.md}>
              <Text fz="sm" c="dimmed">
                <Flex gap="xs" align="center">
                  <IconCalendarTime size={16} />
                  <Moment locale={locale} format="LLLL">
                    {completedChecklist.result?.updatedAt.toString()}
                  </Moment>
                </Flex>
              </Text>
              {completedChecklist.result?.Checklist.description && (
                <Text italic fz="sm" c="dimmed">
                  {completedChecklist.result?.Checklist.description}
                </Text>
              )}
            </Flex>
            <CompletedChecklistItems
              items={completedChecklist.result?.items as string}
            />
            {completedChecklist.result?.note && (
              <Blockquote
                color="green"
                cite={`– ${sessionData?.user.name as string}`}
              >
                {completedChecklist.result?.note}
              </Blockquote>
            )}
          </Flex>
        </Drawer>
      )}
    </>
  );
}
