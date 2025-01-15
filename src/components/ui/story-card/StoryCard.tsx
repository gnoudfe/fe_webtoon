import React from "react";
import styles from "./styles.module.scss";
import Tag from "../tag";
import Link from "next/link";
import { StoryDetailData } from "@/types/story";
import { formatTime } from "@/utils/formatTime";

interface StoryCardProps {
  storyData: StoryDetailData;
  type?: "normal" | "detail";
}
const StoryCard = ({ storyData, type = "normal" }: StoryCardProps) => {
  return type === "normal" ? (
    <Link
      className={styles.story_card}
      href={`/read-hentai/${storyData?.slug}`}
    >
      <div className={styles.story_card_thumbnail}>
        <img src={storyData?.thumbnail} alt={storyData?.title} />
      </div>
      <div className={styles.story_card_infor}>
        <h4 className={styles.story_card_infor_title}>{storyData?.title}</h4>
        <div className={styles.story_card_infor_chapters}>
          <Tag latestChapter={storyData?.latestChapter} />
          <span className={styles.story_card_infor_chapters_times}>
            {formatTime(storyData?.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  ) : (
    <div className={styles.story_card}>
      <div className={styles.story_card_thumbnail}>
        <img src={storyData?.thumbnail} alt={storyData?.title} />
      </div>
    </div>
  );
};

export default StoryCard;
