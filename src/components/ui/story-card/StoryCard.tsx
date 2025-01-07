import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Tag from "../tag";
import Link from "next/link";
const StoryCard = () => {
  return (
    <Link className={styles.story_card} href={"/read-hentai/stop-smoking"}>
      <div className={styles.story_card_thumbnail}>
        <Image
          src={
            "https://media.hentai18.net/images/thumbs/i-have-to-sleep-with-a-stranger.jpg"
          }
          alt="story thumbnail"
          height={362}
          width={300}
        />
      </div>
      <div className={styles.story_card_infor}>
        <h4 className={styles.story_card_infor_title}>My illustrator</h4>
        <div className={styles.story_card_infor_chapters}>
          <Tag />
          <span className={styles.story_card_infor_chapters_times}>
            35 mins ago
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
