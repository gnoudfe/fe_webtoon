import React from "react";
import styles from "./styles.module.scss";
import StoryItem from "@/components/ui/story-item/StoryItem";
import { StoryWebtoonApi } from "@/services/apiRequest";
import { StoryDetailData } from "@/types/story";

async function getTopStories() {
  const response = await StoryWebtoonApi.GetTopStories({});
  return response;
}

const Sidebar = async () => {
  const topStoriesData = await getTopStories();
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebar_title}>TOP MANHWA </h2>
      <li className={styles.sidebar_lists}>
        {topStoriesData?.data?.map((topStory: StoryDetailData) => (
          <StoryItem key={topStory._id} topStory={topStory} />
        ))}
      </li>
    </div>
  );
};

export default Sidebar;
