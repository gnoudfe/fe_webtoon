"use client";
import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import StoryCard from "../../story-card";
import { useGetStoriesByType } from "@/services/queries/useStory";
import { StoryDetailData } from "@/types/story";
import InfiniteScroll from "../../InfiniteScroll";
import ListStorySkeleton from "../list-story-skeleton";

// async function getStoriesByType(slug: string, type: "tag" | "category") {
//   const response = await StoryWebtoonApi.GetStoriesByType({ slug, type });
//   return response;
// }
const ListStoryCategory = ({
  slug,
  type,
}: {
  slug: string;
  type: "tag" | "category";
}) => {
  // const typeStories: StoryResponseData = await getStoriesByType(slug, type);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useGetStoriesByType({
      slug,
      type,
    });

  const typeStories = useMemo(() => {
    return data?.pages?.reduce((acc, page) => {
      return [...acc, ...page.data];
    }, []);
  }, [data]);

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

export default ListStoryCategory;
