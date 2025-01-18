import React from "react";
import styles from "./styles.module.scss";
import { StoryDetailResponseData } from "@/types/story";
import { StoryWebtoonApi } from "@/services/apiRequest";
import ChapterItem from "./chapter-item";

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
            storyId={detailStories?.data?._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ListChapters;
