import React from "react";
import styles from "./styles.module.scss";
import ListStoryType from "@/components/ui/list-story/list-story-type";

interface CategoryPageProps {
  type: "latest" | "top" | "highlight" | "all";
}

const TypeStoryPage = ({ type }: CategoryPageProps) => {
  const validTypes = ["latest", "top", "highlight", "all"];
  const displayType = validTypes.includes(type) ? type : "all";

  return (
    <div className={styles.category_page}>
      <div className={styles.category_page_infor}>
        <h1 className={styles.category_page_infor_title}>{displayType}</h1>
      </div>
      <div className={styles.category_page_lists}>
        <ListStoryType type={displayType} />
      </div>
    </div>
  );
};

export default TypeStoryPage;
