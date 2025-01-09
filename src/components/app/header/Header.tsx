import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { BookMarked, Edit, History, Tag } from "lucide-react";
import SearchHeader from "@/components/ui/search/search-header";
import Link from "next/link";
const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_left}>
          {/* <div className={styles.header_left_logo}>
            <Image
              src="https://static.hentai18.net/images/logo.png"
              alt="Hentai logo"
              width={180}
              height={40}
            />
          </div> */}
          <ul className={styles.header_left_actions}>
            <li className={styles.header_left_actions_item}>
              <Tag />
              <span className={styles.header_left_actions_item_text}>Tags</span>
            </li>
            <li className={styles.header_left_actions_item}>
              <Edit />
              <span className={styles.header_left_actions_item_text}>
                Categories
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
        {/* Auth */}
        <div className={styles.header_auth}>
          <Link href={"/login"} className={styles.header_auth_component}>
            <span className={styles.header_auth_component_text}>Log in</span>
          </Link>
          <Link href={"/signup"} className={styles.header_auth_component}>
            <span className={styles.header_auth_component_text}>Register</span>
          </Link>
        </div>
        {/* Profile Avatar */}
        <div className={styles.header_avatar}>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/023/192/562/small_2x/sport-car-running-on-the-road-in-future-city-created-with-generative-ai-free-photo.jpg"
            alt=""
          />
        </div>
      </div>
      <div className={styles.header_under}>
        <ul className={styles.header_under_lists}>
          <li className={styles.header_under_lists_item}>
            <span className={styles.header_under_lists_item_text}>All</span>
          </li>
          <li className={styles.header_under_lists_item}>
            <span className={styles.header_under_lists_item_text}>Latest</span>
          </li>
          <li className={styles.header_under_lists_item}>
            <span className={styles.header_under_lists_item_text}>Top</span>
          </li>
          <li className={styles.header_under_lists_item}>
            <span className={styles.header_under_lists_item_text}>
              Highlight
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
