import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { StoryDetailResponseData } from "@/types/story";
import { StoryWebtoonApi } from "@/services/apiRequest";

interface ListChaptersProps {
  slug: string;
}
async function getDetailStories(slug: string) {
  const response: StoryDetailResponseData =
    await StoryWebtoonApi.GetDetailStories({ slug });
  return response;
}

const ListChapters = async ({ slug }: ListChaptersProps) => {
  const detailStories = await getDetailStories(slug);

  return (
    <div className={styles.list_chapters}>
      <h4 className={styles.list_chapters_title}>Chapter title of story</h4>
      <div className={styles.list_chapters_grid}>
        {detailStories?.data?.chapters?.map((chapter) => (
          <ChapterItem
            key={chapter.slug}
            title={chapter?.title}
            time={chapter?.time}
            id={chapter?._id}
            slug={chapter?.slug}
            storySlug={detailStories?.data?.slug}
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

const ChapterItem = ({ title, time, slug, storySlug }: ChapterItemProps) => {
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
