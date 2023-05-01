import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
import { useTranslation } from "next-i18next";
import LandingPageSkeleton from "~/components/landingPage/LandingPageSkeleton";
import dynamic from "next/dynamic";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const { t } = useTranslation("common");

  // Dynamic import for code splitting
  const LandingPage = dynamic(
    () => import("~/components/landingPage/LandingPage"),
    {
      loading: () => <LandingPageSkeleton />,
    }
  );

  // If status is loading, show the skeleton
  if (status === "loading") {
    return <LandingPageSkeleton />;
  }

  // If status is unauthenticated, show the landing page
  if (status === "unauthenticated") {
    return (
      <>
        <Head>
          <title>{t("meta.title.landing")}</title>
          <meta name="description" content={t("meta.descipriton") || ""} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <main
          style={{
            overflowX: "hidden",
          }}
        >
          <LandingPage />
        </main>
      </>
    );
  }

  // If status is authenticated, show the children
  return <>{children}</>;
}
