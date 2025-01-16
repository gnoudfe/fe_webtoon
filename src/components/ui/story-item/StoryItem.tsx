import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { StoryDetailData } from "@/types/story";

interface StoryItemProps {
  topStory: StoryDetailData;
}

const StoryItem = ({ topStory }: StoryItemProps) => {
  // href={`/read-hentai/${topStory.slug}`}
  return (
    <div className={styles.story_item}>
      <Link href={`/read-hentai/${topStory.slug}`}>
        <div className={styles.story_item_thumbnail}>
          <img src={topStory?.thumbnail} alt={topStory.title} />
        </div>
      </Link>
      <div className={styles.story_item_infor}>
        <Link
          href={`/read-hentai/${topStory.slug}`}
          className={styles.story_item_infor_title}
        >
          {topStory.title}
        </Link>
        <div className={styles.story_item_infor_tags}>
          {topStory?.tags?.map((tag, index) => (
            <Link
              href={`/tag/${tag.slug}`}
              key={index}
              className={styles.story_item_infor_tags_item}
            >
              <span className={styles.story_item_infor_tags_item_text}>
                {tag.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryItem;
