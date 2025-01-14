import React from "react";
import styles from "./styles.module.scss";
import StoryCard from "../story-card";
import { PaginationDataType, StoryData } from "@/types/story";

interface ListStoryProps {
  type?: string;
  latestStoriesData: {
    message: string;
    status: string;
    data: StoryData[];
    pagingation: PaginationDataType;
  };
}

const ListStory = ({ latestStoriesData, type = "normal" }: ListStoryProps) => {
  return (
    <div className={`${styles.list_story} ${styles[`list_story_${type}`]}`}>
      {latestStoriesData.data.map((story) => (
        <StoryCard key={story._id} storyData={story} />
      ))}
    </div>
  );
};

export default ListStory;
