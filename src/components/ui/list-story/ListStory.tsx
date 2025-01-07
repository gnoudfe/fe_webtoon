import React from "react";
import styles from "./styles.module.scss";
import StoryCard from "../story-card";
const ListStory = () => {
  return (
    <div className={styles.list_story}>
      {[...Array(10)].map((_, index) => (
        <StoryCard key={index} />
      ))}
    </div>
  );
};

export default ListStory;
