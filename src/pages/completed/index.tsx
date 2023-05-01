import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../../next-i18next.config.mjs";
import CompletedChecklistTable from "~/components/completedChecklists/CompletedChecklistTable";
import CompletedChecklistHeader from "~/components/completedChecklists/CompletedChecklistHeader";
import Head from "next/head";
import { useTranslation } from "next-i18next";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"], nextI18nConfig, [
      "en",
      "tr",
    ])),
  },
});

export default function CompletedChecklists() {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("meta.title.completedChecks")}</title>
        <meta name="description" content={t("meta.descipriton") || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CompletedChecklistHeader />
      <CompletedChecklistTable />
    </>
  );
}
