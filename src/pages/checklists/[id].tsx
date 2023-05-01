import {
  Container,
  Flex,
  LoadingOverlay,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import nextI18nConfig from "../../../next-i18next.config.mjs";
import { api } from "~/utils/api";
import ChecklistEditSeciton from "~/components/checklists/edit/ChecklistEditSeciton";
import type { Checklist } from "@prisma/client";
import Head from "next/head";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18nConfig, [
      "en",
      "tr",
    ])),
  },
});

export default function ChecklistPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const NotFoundSection = () => {
    return (
      <>
        <Head>
          <title>{t("meta.title.notFound")}</title>
          <meta name="description" content={t("meta.descipriton") || ""} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Container>
          <Flex
            direction="column"
            justify="center"
            align="center"
            style={{
              height: "100vh",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                padding: theme.spacing.lg,
                borderRadius: theme.spacing.md,
              }}
            >
              <Text
                variant="gradient"
                fw={900}
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
                fz={200}
              >
                404
              </Text>
              <Text
                variant="gradient"
                fw={800}
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
                fz={20}
              >
                {t("notFound")}
              </Text>
            </div>
          </Flex>
        </Container>
      </>
    );
  };

  const { id } = router.query;
  const checklistId = parseInt(id as string);

  const { data: checklistData, isLoading } =
    api.checklist.getChecklist.useQuery({
      id: checklistId,
    });

  if (isLoading) return <LoadingOverlay visible={isLoading} />;
  if (checklistData?.result === null) {
    return <NotFoundSection />;
  }

  const checklist = checklistData?.result as Checklist;
  return (
    <>
      <Head>
        <title>{t("meta.title.checklists")}</title>
        <meta name="description" content={t("meta.descipriton") || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChecklistEditSeciton checklist={checklist} />;
    </>
  );
}
