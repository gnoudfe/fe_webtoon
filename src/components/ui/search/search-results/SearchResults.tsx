"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Avatar } from "../../avatar";
import { StoryDetailData } from "@/types/story";
import Link from "next/link";

interface SearchResultsProps {
  listStory: StoryDetailData[];
  errorMessage?: string;
}

const SearchResults = ({ listStory, errorMessage }: SearchResultsProps) => {
  console.log("re-redner");
  return (
    <ul className={styles.search_results}>
      {listStory.map((story) => (
        <Link key={story._id} href={`/read/${story.slug}`}>
          <li className={styles.header_auth_notifications_infor_item}>
            <Avatar previewImage={story?.thumbnail} size="lg" />
            <div
              className={styles.header_auth_notifications_infor_item_content}
            >
              <span
                className={
                  styles.header_auth_notifications_infor_item_content_title
                }
              >
                {story.title}
              </span>
              <span
                className={
                  styles.header_auth_notifications_infor_item_content_time
                }
              >
                {story.latestChapter?.title}
              </span>
            </div>
          </li>
        </Link>
      ))}

      {errorMessage && (
        <li className={styles.header_auth_notifications_infor_item}>
          <span
            className={
              styles.header_auth_notifications_infor_item_content_title
            }
          >
            {errorMessage}
          </span>
        </li>
      )}
    </ul>
  );
};

export default SearchResults;
