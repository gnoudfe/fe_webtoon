"use client";
import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import StoryCard from "../../story-card";
import { useGetStories } from "@/services/queries/useStory";
import { StoryDetailData } from "@/types/story";
import InfiniteScroll from "../../InfiniteScroll";
import ListStorySkeleton from "../list-story-skeleton";

const ListStoryType = ({
  type,
}: {
  type: "latest" | "top" | "highlight" | "all";
}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useGetStories({
    type,
  });

  const typeStories = useMemo(() => {
    return data?.pages?.reduce((acc, page) => {
      return [...acc, ...page.data];
    }, []);
  }, [data]);

  if (error) {
    return (
      <div className={styles.error_message}>
        {(error as Error).message || "An unexpected error occurred."}
      </div>
    );
  }

  if (!isLoading && typeStories?.length === 0)
    return <div className={styles.error_message}>No stories found.</div>;

  return isLoading ? (
    <ListStorySkeleton />
  ) : (
    <InfiniteScroll
      loadMore={fetchNextPage}
      hasMore={hasNextPage || !isFetchingNextPage}
    >
      <div className={`${styles.list_story_category}`}>
        {typeStories?.map((story: StoryDetailData) => (
          <StoryCard key={story._id} storyData={story} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ListStoryType;
