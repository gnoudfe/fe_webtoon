"use client";
import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import { useGetFollowingStories } from "@/services/queries/useStory";
import ListStorySkeleton from "../list-story-skeleton";
import InfiniteScroll from "../../InfiniteScroll";
import { StoryDetailData } from "@/types/story";
import StoryCard from "../../story-card";

const ListStoryFollowing = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useGetFollowingStories();

  const followingStories = useMemo(() => {
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
  if (!isLoading && followingStories?.length === 0) {
    return <div className={styles.error_message}>No stories found.</div>;
  }

  return isLoading ? (
    <ListStorySkeleton />
  ) : (
    <InfiniteScroll
      loadMore={fetchNextPage}
      hasMore={hasNextPage || !isFetchingNextPage}
    >
      <div className={`${styles.list_story_category}`}>
        {followingStories?.map((story: StoryDetailData) => (
          <StoryCard key={story._id} storyData={story} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ListStoryFollowing;
