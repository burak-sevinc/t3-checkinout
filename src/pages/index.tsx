import { type NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { Flex, Skeleton, useMantineTheme } from "@mantine/core";
import nextI18nConfig from "../../next-i18next.config.mjs";
import dynamic from "next/dynamic.js";
import { useTranslation } from "next-i18next";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18nConfig, [
      "en",
      "tr",
    ])),
  },
});

const HelloMessage = dynamic(() => import("~/components/home/HelloMessage"), {
  loading: () => (
    <>
      <Skeleton h={120} />
    </>
  ),
});

const Stats = dynamic(() => import("~/components/home/Stats"), {
  loading: () => (
    <>
      <Skeleton h={300} />
    </>
  ),
});

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const { data: sessionData } = useSession();
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("meta.title.home")}</title>
        <meta name="description" content={t("meta.descipriton") || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex direction="column" gap={theme.spacing.md}>
          <HelloMessage
            username={sessionData?.user.name as string}
            photo={sessionData?.user.image as string}
          />
          <Stats />
        </Flex>
      </main>
    </>
  );
};

export default Home;
