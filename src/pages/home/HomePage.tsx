import React from "react";
import styles from "./styles.module.scss";
import SectionHeader from "@/components/ui/section-header";
import ListStory from "@/components/ui/list-story";
import SlideStory from "@/components/ui/slideStory";
const HomePage = () => {
  return (
    <div className={styles.home_page}>
      <section className={styles.home_page_section}>
        <SectionHeader title="Highlight Manhwa Updates" />
        <SlideStory />
      </section>
      <div className={styles.home_page_seperate}></div>
      <section className={styles.home_page_section}>
        <SectionHeader title="Latest Manhwa Updates" />
        <ListStory />
      </section>
    </div>
  );
};

export default HomePage;
