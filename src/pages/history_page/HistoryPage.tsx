import React from "react";
import styles from "./styles.module.scss";
import ListStoryHistory from "@/components/ui/list-story/list-story-history";

const HistoryPage = () => {
  return (
    <div className={styles.category_page}>
      <div className={styles.category_page_infor}>
        <h1 className={styles.category_page_infor_title}>
          Your Lists History Stories
        </h1>
      </div>
      <div className={styles.category_page_lists}>
        <ListStoryHistory />
      </div>
    </div>
  );
};

export default HistoryPage;
