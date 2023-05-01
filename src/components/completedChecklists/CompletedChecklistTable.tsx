import React, { Fragment, useState } from "react";
import {
  Flex,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Progress,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useTranslation } from "next-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import Moment from "react-moment";
import { api } from "~/utils/api";
import "moment/locale/tr";
import { useRouter } from "next/router";
import ShowCompletedChecklistDrawer from "./ShowCompletedChecklistDrawer";
import useStyles from "./CompletedChecklistTable.styles";
import type {
  ICheckItems,
  ICompletedChecklist,
} from "~/types/completedChecklist";

export default function CompletedChecklistTable() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [selectedChecklistId, setSelectedChecklistId] = useState<number>();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerIsLoading, setDrawerIsLoading] = useState(false);
  const { classes, theme } = useStyles();

  // Get all completed checklists
  const {
    data: completedChecklists,
    fetchNextPage,
    hasNextPage,
    isLoading,
    status,
  } = api.completedChecklist.getAll.useInfiniteQuery(
    {
      limit: 20,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  //  Progress bar component
  function ProgressBar({
    checkedItems,
    unCheckedItems,
  }: {
    checkedItems: number;
    unCheckedItems: number;
  }) {
    return (
      <Progress
        classNames={{
          bar: classes.progressBar,
        }}
        sections={[
          {
            value: checkedItems,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.teal[9]
                : theme.colors.teal[6],
          },
          {
            value: unCheckedItems,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.red[9]
                : theme.colors.red[6],
          },
        ]}
      />
    );
  }

  const handleDrawer = (id: number) => () => {
    setDrawerIsLoading(true);
    setSelectedChecklistId(id);
    setDrawerOpened(true);
  };

  // Row component
  const rows = completedChecklists?.pages.map((page) =>
    page.count > 0 ? (
      page.result.map(
        ({ id, Checklist, items, updatedAt }: ICompletedChecklist) => {
          //Calculate percentage of checked and unchecked items
          const checklistItems = JSON.parse(items as string) as ICheckItems[];
          const totalItems = checklistItems.length;
          const checkedItems =
            (checklistItems.filter((item) => item.checked === true).length /
              totalItems) *
            100;
          const unCheckedItems =
            (checklistItems.filter((item) => item.checked === false).length /
              totalItems) *
            100;

          return (
            <Fragment key={"completedChecklistRow" + id.toString()}>
              <tr>
                <td>
                  <Text
                    onClick={handleDrawer(id)}
                    fz="sm"
                    className={classes.textLink}
                    truncate
                  >
                    {Checklist.title}
                  </Text>
                </td>
                <td>
                  <Text>
                    <Moment fromNow locale={locale}>
                      {updatedAt.toString()}
                    </Moment>
                  </Text>
                </td>
                <td>
                  <Group position="apart">
                    <Text fz="xs" c="teal" weight={700}>
                      {checkedItems.toFixed(0)}%
                    </Text>
                    {unCheckedItems > 0 && (
                      <Text fz="xs" c="red" weight={700}>
                        {unCheckedItems.toFixed(0)}%
                      </Text>
                    )}
                  </Group>
                  <ProgressBar
                    checkedItems={checkedItems}
                    unCheckedItems={unCheckedItems}
                  ></ProgressBar>
                </td>
              </tr>
            </Fragment>
          );
        }
      )
    ) : (
      <Flex key={page.count} justify="center" my={theme.spacing.lg}>
        <Text c="dimmed">{t("warnings.completedChecks.notFound")} 😏</Text>
      </Flex>
    )
  );

  return (
    <>
      <LoadingOverlay visible={isLoading || drawerIsLoading} />
      <ShowCompletedChecklistDrawer
        drawerOpened={drawerOpened}
        setDrawerOpened={setDrawerOpened}
        selectedChecklistId={selectedChecklistId}
        setDrawerIsLoading={setDrawerIsLoading}
      />
      {status === "success" && (
        <InfiniteScroll
          dataLength={completedChecklists?.pages.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={
            <Flex justify="center" my={theme.spacing.lg}>
              <Loader size="sm" variant="dots" />
            </Flex>
          }
          endMessage={
            <Flex justify="center" my={theme.spacing.xl}>
              <Text c="dimmed">{t("noMorePage")}</Text>
            </Flex>
          }
        >
          <Paper shadow="sm" my="1rem">
            <ScrollArea p="md">
              <Table
                striped
                style={{
                  tableLayout: "fixed",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th>{t("completedChecks.table.checklistName")}</th>
                    <th>{t("completedChecks.table.date")}</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </ScrollArea>
          </Paper>
        </InfiniteScroll>
      )}
    </>
  );
}
