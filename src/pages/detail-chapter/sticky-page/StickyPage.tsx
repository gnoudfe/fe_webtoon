import React from "react";
import styles from "./styles.module.scss";
import { DetailChapterButton } from "../chapter-infor/DetailChapterInfor";
import { ChapterResponseData } from "@/types/chapter";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

interface StickyPageProps {
  chapterDetailData: ChapterResponseData;
  show: boolean;
  storyTitle: string;
  storySlug: string;
}
const StickyPage = ({
  chapterDetailData,
  show = false,
  storyTitle,
  storySlug,
}: StickyPageProps) => {
  return (
    <div
      className={`${styles.sticky_page} ${
        show ? `${styles.sticky_page_show}` : ""
      }`}
    >
      <Link href={"/"} className={styles.sticky_page_icon}>
        <HomeIcon color="#000" />
      </Link>
      <Link href={`/read-hentai/${storySlug}`}>
        <h4 className={styles.sticky_page_title}>{storyTitle}</h4>
      </Link>

      <DetailChapterButton type={2} chapterDetailData={chapterDetailData} />
    </div>
  );
};

export default StickyPage;
