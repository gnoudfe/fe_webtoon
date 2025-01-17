"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Bookmark, BookmarkCheck } from "lucide-react";
import {
  UseFollowStoryMutation,
  UseUnFollowStoryMutation,
} from "@/services/queries/useStory";
import { useGlobalStore } from "@/stores/state";
import { useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
const ButtonFollow = ({ slug, storyId }: { slug: string; storyId: string }) => {
  // Xác định trạng thái follow ban đầu
  const { userData } = useGlobalStore();
  const followMutation = UseFollowStoryMutation();
  const unFollowMutation = UseUnFollowStoryMutation();
  const queryClient = useQueryClient();

  const isFollow = React.useMemo(() => {
    return userData?.followedStories?.includes(storyId) || false;
  }, [userData, storyId]);
  const handleFollow = useDebounce(async () => {
    try {
      let response;

      if (isFollow) {
        response = await unFollowMutation.mutateAsync({ slug });
      } else {
        response = await followMutation.mutateAsync({ slug });
      }
      if (response && response.status === "success") {
        queryClient.refetchQueries({ queryKey: ["verifyUser"] });
        queryClient.invalidateQueries({ queryKey: ["getFollowingStories"] });
      }
    } catch (error) {
      console.log(error);
    }
  }, 500);

  return (
    <button
      className={styles.detail_page_hero_content_infor_btn}
      onClick={handleFollow}
    >
      {!isFollow ? (
        <>
          <Bookmark color="#fff" />
          <span className={styles.detail_page_hero_content_infor_btn_text}>
            {followMutation?.isPending ? "Loading..." : "Follow"}
          </span>
        </>
      ) : (
        <>
          <BookmarkCheck color="#fff" />
          <span className={styles.detail_page_hero_content_infor_btn_text}>
            {unFollowMutation?.isPending ? "Loading..." : "Unfollow"}
          </span>
        </>
      )}
    </button>
  );
};

export default ButtonFollow;
