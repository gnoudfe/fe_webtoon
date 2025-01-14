import React from "react";
import styles from "./styles.module.scss";
import { TagData } from "@/types/tag";
import { Bookmark, PointerIcon } from "lucide-react";
import { DataMockResponse } from "@/mock/tagMock";
import { storyDataMock } from "@/mock/storyDataMock";
import StoryCard from "@/components/ui/story-card";
import Link from "next/link";
const DetailPageHero = () => {
  return (
    <div className={styles.detail_page_hero}>
      <div className={styles.detail_page_hero_overlay}></div>
      <img
        src="https://images.pexels.com/photos/4871395/pexels-photo-4871395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=2000"
        alt=""
      />
      <div className={styles.detail_page_hero_content}>
        <div className={styles.detail_page_hero_content_card}>
          <StoryCard storyData={storyDataMock} type="detail" />
        </div>
        <div className={styles.detail_page_hero_content_infor}>
          <h1 className={styles.detail_page_hero_content_infor_title}>
            Stop Smoking
          </h1>
          <DetailPageItem keyItem="Artists" value="MomoBird" />
          <DetailPageItem
            keyItem="Tags"
            value="MomoBird"
            data={DataMockResponse?.data}
          />
          <DetailPageItem keyItem="Category" value="Manhwa" />
          <DetailPageItem keyItem="Status" value="Ongoing" type={2} />
          <DetailPageItem keyItem="Views" value={50000} type={2} />
          <DetailPageItem keyItem="Followers" value={1402} type={2} />
          <DetailPageItem keyItem="Posted" value="3 days ago" type={2} />
          <DetailPageItem keyItem="Rating" value={4.5} type={2} />
          <div className={styles.detail_page_hero_content_infor_container}>
            <button
              className={`${styles.detail_page_hero_content_infor_btn} ${styles.detail_page_hero_content_infor_btn_read}`}
            >
              <PointerIcon color="#fff" />
              <span className={styles.detail_page_hero_content_infor_btn_text}>
                Read now
              </span>
            </button>
            <button className={styles.detail_page_hero_content_infor_btn}>
              <Bookmark color="#fff" />
              <span className={styles.detail_page_hero_content_infor_btn_text}>
                Follow
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailPageItemProps {
  keyItem: string;
  value?: string | number;
  data?: TagData[];
  type?: number;
}

const DetailPageItem = ({
  keyItem,
  value,
  data = [],
  type = 1,
}: DetailPageItemProps) => {
  return (
    <div className={styles.detail_page_hero_content_infor_item}>
      <span className={styles.detail_page_hero_content_infor_item_text}>
        {keyItem}:
      </span>
      {type === 1 ? (
        data?.length > 0 ? (
          data.map((item) => (
            <Link
              key={item._id}
              className={styles.detail_page_hero_content_infor_item_value}
              href={`/tag/${item.slug}`}
            >
              {item.name}
            </Link>
          ))
        ) : (
          <Link
            href={`${keyItem === "Artists" ? `/artist/${value}` : `/${value}`}`}
            className={styles.detail_page_hero_content_infor_item_value}
          >
            {value}
          </Link>
        )
      ) : (
        <span className={styles.detail_page_hero_content_infor_item_text}>
          {value?.toLocaleString("en-US")}
        </span>
      )}
    </div>
  );
};

export default DetailPageHero;
