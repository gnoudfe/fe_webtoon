import React from "react";
import styles from "./styles.module.scss";
import Tag from "../tag";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className={styles.section_header}>
      <h2 className={styles.section_header_title}>{title}</h2>
      <ul className={styles.section_header_tags}>
        <Tag />
      </ul>
    </div>
  );
};

export default SectionHeader;
