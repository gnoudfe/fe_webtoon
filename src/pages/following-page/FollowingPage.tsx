import React from "react";
import styles from "./styles.module.scss";
import ListStoryFollowing from "@/components/ui/list-story/list-story-following";

const FollowingPage = () => {
  return (
    <div className={styles.category_page}>
      <div className={styles.category_page_infor}>
        <h1 className={styles.category_page_infor_title}>
          Your Lists Following Stories
        </h1>
      </div>
      <div className={styles.category_page_lists}>
        <ListStoryFollowing />
      </div>
    </div>
  );
};

export default FollowingPage;
