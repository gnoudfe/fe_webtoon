import React from "react";
import styles from "./styles.module.scss";
import StoryItem from "@/components/ui/story-item/StoryItem";
const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebar_title}>TOP MANHWA </h2>
      <li className={styles.sidebar_lists}>
        {[...Array(10)].map((_, index) => (
          <StoryItem key={index} />
        ))}
      </li>
    </div>
  );
};

export default Sidebar;
