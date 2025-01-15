import React from "react";
import styles from "./styles.module.scss";
import StoryItem from "@/components/ui/story-item/StoryItem";
import { PaginationDataType, StoryDetailData } from "@/types/story";

interface SidebarProps {
  topStoriesData: {
    message: string;
    status: string;
    data: StoryDetailData[];
    pagination: PaginationDataType;
  };
}

const Sidebar = ({ topStoriesData }: SidebarProps) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebar_title}>TOP MANHWA </h2>
      <li className={styles.sidebar_lists}>
        {topStoriesData?.data?.map((topStory) => (
          <StoryItem key={topStory._id} topStory={topStory} />
        ))}
      </li>
    </div>
  );
};

export default Sidebar;
