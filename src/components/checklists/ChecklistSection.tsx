import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { api } from "~/utils/api";
import {
  Flex,
  Loader,
  LoadingOverlay,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import ChecklistSkeleton from "./ChecklistSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const ChecklistCard = dynamic(
  () => import("~/components/checklists/ChecklistCard"),
  {
    loading: () => <ChecklistSkeleton />,
  }
);
type ChecklistSectionProps = {
  searchTerm: string;
};
export default function ChecklistSection({
  searchTerm,
}: ChecklistSectionProps) {
  const { t } = useTranslation("common");
  const theme = useMantineTheme();
  const {
    data: checklist,
    fetchNextPage,
    hasNextPage,
    isLoading,
    status,
  } = api.checklist.getAll.useInfiniteQuery(
    {
      limit: 18,
      searchTerm: searchTerm,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const checklistCards = checklist?.pages.map((page) =>
    page.count > 0 ? (
      page.result.map(({ id, title, description, items }, index) => (
        <ChecklistCard
          key={index}
          id={id}
          title={title}
          description={description || ""}
          items={items}
        />
      ))
    ) : (
      <Flex key={page.count} my={theme.spacing.lg}>
        <Text c="dimmed">{t("warnings.checklists.notFound")} 😏</Text>
      </Flex>
    )
  );

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      {status === "success" && (
        <InfiniteScroll
          dataLength={checklist?.pages.length}
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
          <SimpleGrid
            breakpoints={[
              { minWidth: "md", cols: 2 },
              { minWidth: "lg", cols: 3 },
            ]}
          >
            {checklistCards}
          </SimpleGrid>
        </InfiniteScroll>
      )}
    </>
  );
}
