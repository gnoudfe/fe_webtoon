import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const StoryItem = () => {
  return (
    <div className={styles.story_item}>
      <div className={styles.story_item_thumbnail}>
        <Image
          src={"https://media.hentai18.net/images/thumbs/stop-smoking.jpg"}
          alt="thumbnail image"
          width={80}
          height={110}
        />
      </div>
      <div className={styles.story_item_infor}>
        <h4 className={styles.story_item_infor_title}>Stop Smoking</h4>
        <div className={styles.story_item_infor_tags}>
          <div className={styles.story_item_infor_tags_item}>
            <span className={styles.story_item_infor_tags_item_text}>
              Manhwa
            </span>
          </div>
          <div className={styles.story_item_infor_tags_item}>
            <span className={styles.story_item_infor_tags_item_text}>
              Manhwa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryItem;
