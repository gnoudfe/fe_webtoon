import React from "react";
import styles from "./styles.module.scss";
interface TagProps {
  latestChapter?: {
    _id: string;
    time?: string;
    title: string;
  };
}
const Tag = ({ latestChapter }: TagProps) => {
  return (
    <li className={styles.section_header_tags_item}>
      <span className={styles.section_header_tags_item_text}>
        {latestChapter?.title}
      </span>
    </li>
  );
};

export default Tag;
