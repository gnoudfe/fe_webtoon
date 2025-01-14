import React from "react";
import styles from "./styles.module.scss";
import HeroSections from "@/components/ui/hero_sections";
const Collections = () => {
  return (
    <div className={styles.collections_page}>
      <div className={styles.collections_page_hero}>
        <HeroSections />
      </div>
    </div>
  );
};

export default Collections;
