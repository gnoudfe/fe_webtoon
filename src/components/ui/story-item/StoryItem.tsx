import React from "react";
import styles from "./styles.module.scss";
import { StoryData } from "@/types/story";
import Link from "next/link";

interface StoryItemProps {
  topStory: StoryData;
}

const StoryItem = ({ topStory }: StoryItemProps) => {
  return (
    <Link href={`/read-hentai/${topStory.slug}`} className={styles.story_item}>
      <div className={styles.story_item_thumbnail}>
        <img src={topStory?.thumbnail} alt={topStory.title} />
      </div>
      <div className={styles.story_item_infor}>
        <h4 className={styles.story_item_infor_title}>{topStory.title}</h4>
        <div className={styles.story_item_infor_tags}>
          {topStory?.tags?.map((tag, index) => (
            <div className={styles.story_item_infor_tags_item} key={index}>
              <span className={styles.story_item_infor_tags_item_text}>
                {tag.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default StoryItem;
