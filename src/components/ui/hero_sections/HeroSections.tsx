import React from "react";
import styles from "./styles.module.scss";
const HeroSections = () => {
  return (
    <div className={styles.hero_sections}>
      <img
        src="https://images.pexels.com/photos/4871395/pexels-photo-4871395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=2000"
        alt=""
      />
      <div className={styles.hero_sections_content}>
        <h1 className={styles.hero_sections_content_title}>
          The best free stock photos, royalty free images & videos shared by
          creators.
        </h1>
      </div>
    </div>
  );
};

export default HeroSections;
