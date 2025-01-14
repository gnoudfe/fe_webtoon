import React from "react";
import styles from "./styles.module.scss";
import StoryCard from "../story-card";
import { PaginationDataType, StoryData } from "@/types/story";

interface ListStoryProps {
  latestStoriesData: {
    message: string;
    status: string;
    data: StoryData[];
    pagingation: PaginationDataType;
  };
}

const ListStory = ({ latestStoriesData }: ListStoryProps) => {
  return (
    <div className={styles.list_story}>
      {latestStoriesData?.data?.map((story) => (
        <StoryCard key={story._id} storyData={story} />
      ))}
    </div>
  );
};

export default ListStory;
