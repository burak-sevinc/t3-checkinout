import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import nextI18nConfig from "../../next-i18next.config.mjs";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Layout from "~/components/layout/layout";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Inter } from "next/font/google";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import AuthProvider from "~/auth/AuthProvider";
import { Notifications } from "@mantine/notifications";
import type { ColorScheme } from "@mantine/core";
import type { Session } from "next-auth";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

// const MyApp: AppType<{ session: Session | null }> = ({
const MyApp = (
  props: AppProps<{ session: Session | null }> & { colorScheme: ColorScheme }
) => {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: colorScheme, fontFamily: inter.style.fontFamily }}
        withGlobalStyles
        withNormalizeCSS
      >
        <SessionProvider session={session}>
          <AuthProvider>
            <Notifications position="top-right" />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

const I18nApp = appWithTranslation(MyApp, nextI18nConfig);
const TRPCApp = api.withTRPC(I18nApp);
export default TRPCApp;
