import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { BookMarked, Edit, History, Tag } from "lucide-react";
import SearchHeader from "@/features/search/search_header";
const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_left}>
          <div className={styles.header_left_logo}>
            <Image
              src="https://static.hentai18.net/images/logo.png"
              alt="Hentai logo"
              width={180}
              height={40}
            />
          </div>
          <ul className={styles.header_left_actions}>
            <li className={styles.header_left_actions_item}>
              <Tag />
              <span className={styles.header_left_actions_item_text}>Tags</span>
            </li>
            <li className={styles.header_left_actions_item}>
              <Edit />
              <span className={styles.header_left_actions_item_text}>
                Artist
              </span>
            </li>

            <li className={styles.header_left_actions_item}>
              <BookMarked />
              <span className={styles.header_left_actions_item_text}>
                Bookmark
              </span>
            </li>
            <li className={styles.header_left_actions_item}>
              <History />
              <span className={styles.header_left_actions_item_text}>
                History
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.header_right}>
          <SearchHeader />
        </div>
      </div>
      <div className={styles.header_under}>
        <ul className={styles.header_under_lists}>
          <li className={styles.header_under_lists_item}>
            <span className={styles.header_under_lists_item_text}>
              All hentai
            </span>
          </li>
          <li className={styles.header_under_lists_item}>
            <span className={styles.header_under_lists_item_text}>
              Latest Hentai
            </span>
          </li>
          <li className={styles.header_under_lists_item}>
            <span className={styles.header_under_lists_item_text}>
              Top Hentai
            </span>
          </li>
          <li className={styles.header_under_lists_item}>
            <span className={styles.header_under_lists_item_text}>
              Highlight Hentai
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
