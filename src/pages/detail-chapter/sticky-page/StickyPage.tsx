import React from "react";
import styles from "./styles.module.scss";
import { DetailChapterButton } from "../chapter-infor/DetailChapterInfor";
import { ChapterResponseData } from "@/types/chapter";

interface StickyPageProps {
  chapterDetailData: ChapterResponseData;
}
const StickyPage = ({ chapterDetailData }: StickyPageProps) => {
  return (
    <div className={styles.sticky_page}>
      <DetailChapterButton type={2} chapterDetailData={chapterDetailData} />
    </div>
  );
};

export default StickyPage;
