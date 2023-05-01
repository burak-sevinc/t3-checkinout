import {
  Accordion,
  Grid,
  Col,
  Container,
  Title,
  Skeleton,
} from "@mantine/core";
import faqsUrl from "../../../public/faqs.svg?url";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import useStyles from "./FaqSection.styles";

type Question = {
  question: string;
  answer: string;
};

export default function FaqSection() {
  const { classes } = useStyles();
  const { t } = useTranslation("common");

  // Lazy load image
  const Image = dynamic(() => import("next/image"), {
    loading: () => <Skeleton h={500} radius="lg" />,
  });

  const questions: Question[] = t("faq.questions", { returnObjects: true });
  const items = questions.map((item: Question, index: number) => (
    <Accordion.Item key={index} className={classes.item} value={item.question}>
      <Accordion.Control>{item.question}</Accordion.Control>
      <Accordion.Panel>{item.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Col span={12} md={6}>
            <Container>
              <Image
                fill
                className="imageChild"
                src={faqsUrl || ""}
                alt="Frequently Asked Questions"
              />
            </Container>
          </Col>
          <Col span={12} md={6}>
            <Title order={2} ta="left" className={classes.title}>
              {t("faq.title")}
            </Title>
            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              {items}
            </Accordion>
          </Col>
        </Grid>
      </Container>
    </div>
  );
}
