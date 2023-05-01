import {
  Container,
  Title,
  Text,
  Button,
  BackgroundImage,
  LoadingOverlay,
} from "@mantine/core";
import { signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import useStyles from "./HeroSection.styles";

function wrapAsyncFunction<ARGS extends unknown[]>(
  fn: (...args: ARGS) => Promise<unknown>
): (...args: ARGS) => void {
  return (...args) => {
    void fn(...args);
  };
}

// Hero section with title, description and button
export default function HeroSection() {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn(): Promise<void> {
    setIsLoading(true);
    await signIn("auth0");
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <BackgroundImage
        src="../../checkinout_hero.webp"
        className={classes.root}
      >
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: "cyan", to: "blue" }}
                >
                  Checkinout
                </Text>{" "}
                {t("hero.title")}
              </Title>

              <Text className={classes.description} mt={30}>
                {t("hero.description")}
              </Text>

              <Button
                onClick={wrapAsyncFunction(handleSignIn)}
                variant="gradient"
                gradient={{ from: "cyan", to: "blue" }}
                size="xl"
                className={classes.control}
                mt={40}
              >
                {t("hero.button")}
              </Button>
            </div>
          </div>
        </Container>
      </BackgroundImage>
    </>
  );
}
