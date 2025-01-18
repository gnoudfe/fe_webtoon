"use client";
import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useAddHistoryStoryMutation } from "@/services/queries/useStory";
import { useGlobalStore } from "@/stores/state";
interface ChapterItemProps {
  title: string;
  time: string;
  id: string;
  slug: string;
  storySlug: string;
  storyId: string;
}

const ChapterItem = ({
  title,
  time,
  slug,
  storySlug,
  storyId,
}: ChapterItemProps) => {
  const { userData } = useGlobalStore();

  const queryClient = useQueryClient();
  const historyMutation = useAddHistoryStoryMutation();

  const isInHistory = React.useMemo(() => {
    return userData?.readingHistory?.includes(storyId) || false;
  }, [storyId, userData]);

  const handleAddToHistoryList = async () => {
    if (isInHistory) return;
    try {
      const response = await historyMutation.mutateAsync({
        slug: storySlug,
      });
      if (response && response.status === "success") {
        queryClient.invalidateQueries({
          queryKey: ["getHistoryStories"],
          refetchType: "all",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Link
      href={`/read/${storySlug}/${slug}`}
      className={styles.chapter_item}
      onClick={handleAddToHistoryList}
    >
      <h5 className={styles.chapter_item_title}>{title}</h5>
      <p className={styles.chapter_item_date}>{time}</p>
    </Link>
  );
};
export default ChapterItem;
