import React from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@mantine/core";
import ScrollTopButton from "./ScrollTopButton";

//Dynamic imports for code splitting
const HeaderComponent = dynamic(() => import("./Header"), {
  loading: () => <Skeleton h={60} />,
});

const HeroSection = dynamic(() => import("./HeroSection"), {
  loading: () => <Skeleton h={500} />,
});

const FaqSection = dynamic(() => import("./FaqSection"), {
  loading: () => <Skeleton h={500} />,
});

const Footer = dynamic(() => import("./Footer"), {
  loading: () => <Skeleton h={300} />,
});

export default function LandingPage() {
  //Dummy data for the header links
  // If you want to use the header links, you can pass them as props to the HeaderComponent
  // const links = [
  //   {
  //     link: "/about",
  //     label: "Features",
  //   },
  //   {
  //     link: "#1",
  //     label: "Learn",
  //   },
  //   {
  //     link: "/about",
  //     label: "About",
  //   },
  //   {
  //     link: "/pricing",
  //     label: "Pricing",
  //   },
  //   {
  //     link: "#2",
  //     label: "Support",
  //     links: [
  //       {
  //         link: "/faq",
  //         label: "FAQ",
  //       },
  //       {
  //         link: "/demo",
  //         label: "Book a demo",
  //       },
  //       {
  //         link: "/forums",
  //         label: "Forums",
  //       },
  //     ],
  //   },
  // ];

  return (
    <>
      <ScrollTopButton />
      <HeaderComponent />
      <HeroSection />
      <FaqSection />
      <Footer />
    </>
  );
}
