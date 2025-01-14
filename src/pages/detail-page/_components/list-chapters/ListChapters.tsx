import React from "react";
import styles from "./styles.module.scss";
const ListChapters = () => {
  return (
    <div className={styles.list_chapters}>
      <h4 className={styles.list_chapters_title}>Chapter title of story</h4>
      <div className={styles.list_chapters_grid}>
        {[...Array(40)].map((_, index) => (
          <ChapterItem key={index} />
        ))}
      </div>
    </div>
  );
};

const ChapterItem = () => {
  return (
    <div className={styles.chapter_item}>
      <h5 className={styles.chapter_item_title}>Chapter 11</h5>
      <p className={styles.chapter_item_date}>January 14, 2025</p>
    </div>
  );
};

export default ListChapters;
