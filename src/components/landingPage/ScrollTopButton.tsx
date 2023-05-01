import { Affix, Button, Transition, rem } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

// Scroll top button is a button that appears when user scrolls down
export default function ScrollTopButton() {
  const [scroll, scrollTo] = useWindowScroll();
  const { t } = useTranslation();
  return (
    <Affix position={{ bottom: rem(20), right: rem(20) }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            leftIcon={<IconArrowUp size="1rem" />}
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            {t("backToTop")}
          </Button>
        )}
      </Transition>
    </Affix>
  );
}
