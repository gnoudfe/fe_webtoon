import React from "react";
import styles from "./styles.module.scss";
import { ChapterType } from "@/types/chapter";
import Link from "next/link";

interface ListChaptersProps {
  chaptersData: ChapterType[];
  storySlug: string;
}

const ListChapters = ({ chaptersData = [], storySlug }: ListChaptersProps) => {
  return (
    <div className={styles.list_chapters}>
      <h4 className={styles.list_chapters_title}>Chapter title of story</h4>
      <div className={styles.list_chapters_grid}>
        {chaptersData?.map((chapter) => (
          <ChapterItem
            key={chapter.slug}
            title={chapter?.title}
            time={chapter?.time}
            id={chapter?._id}
            slug={chapter?.slug}
            storySlug={storySlug}
          />
        ))}
      </div>
    </div>
  );
};

interface ChapterItemProps {
  title: string;
  time: string;
  id: string;
  slug: string;
  storySlug: string;
}

const ChapterItem = ({
  title,
  time,
  id,
  slug,
  storySlug,
}: ChapterItemProps) => {
  return (
    <Link
      href={`/read-hentai/${storySlug}/${slug}`}
      className={styles.chapter_item}
    >
      <h5 className={styles.chapter_item_title}>{title}</h5>
      <p className={styles.chapter_item_date}>{time}</p>
    </Link>
  );
};

export default ListChapters;
