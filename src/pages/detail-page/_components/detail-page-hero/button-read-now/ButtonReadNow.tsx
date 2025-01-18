"use client";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import { PointerIcon } from "lucide-react";
import { useAddHistoryStoryMutation } from "@/services/queries/useStory";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalStore } from "@/stores/state";
const ButtonReadNow = ({
  slug,
  storyId,
}: {
  slug: string;
  storyId: string;
}) => {
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
        slug,
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
    <button
      className={`${styles.detail_page_hero_content_infor_btn} ${styles.detail_page_hero_content_infor_btn_read}`}
      onClick={handleAddToHistoryList}
    >
      <PointerIcon color="#fff" />
      <Link
        href={`/read/${slug}/chapter-1`}
        className={styles.detail_page_hero_content_infor_btn_text}
      >
        Read now
      </Link>
    </button>
  );
};

export default ButtonReadNow;
