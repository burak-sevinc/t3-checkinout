import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nConfig from "../../../next-i18next.config.mjs";
import ChecklistHeader from "~/components/checklists/ChecklistHeader";
import ChecklistSection from "~/components/checklists/ChecklistSection";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
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

export default function Checklists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced] = useDebouncedValue(searchTerm, 500);
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("meta.title.checklists")}</title>
        <meta name="description" content={t("meta.descipriton") || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChecklistHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ChecklistSection searchTerm={debounced} />
    </>
  );
}
