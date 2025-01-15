import React from "react";
import styles from "./styles.module.scss";
import { TagData } from "@/types/tag";
import { Bookmark, PointerIcon } from "lucide-react";
import StoryCard from "@/components/ui/story-card";
import Link from "next/link";
import { StoryDetailData } from "@/types/story";
import { formatTime } from "@/utils/formatTime";

interface DetailPageHeroProps {
  detailStoryData: StoryDetailData;
}

const DetailPageHero = ({ detailStoryData }: DetailPageHeroProps) => {
  return (
    <div className={styles.detail_page_hero}>
      <div className={styles.detail_page_hero_overlay}></div>
      <img src={detailStoryData?.thumbnail} alt="" />
      <div className={styles.detail_page_hero_content}>
        <div className={styles.detail_page_hero_content_card}>
          <StoryCard storyData={detailStoryData} type="detail" />
        </div>
        <div className={styles.detail_page_hero_content_infor}>
          <h1 className={styles.detail_page_hero_content_infor_title}>
            {detailStoryData?.title}
          </h1>
          <DetailPageItem
            keyItem="Artists"
            value={detailStoryData?.author?.name}
          />
          <DetailPageItem keyItem="Tags" data={detailStoryData?.tags} />
          <DetailPageItem
            keyItem="Category"
            value={detailStoryData?.category?.name}
          />
          <DetailPageItem
            keyItem="Status"
            value={detailStoryData?.status}
            type={2}
          />
          <DetailPageItem
            keyItem="Views"
            value={detailStoryData?.views}
            type={2}
          />
          <DetailPageItem
            keyItem="Followers"
            value={detailStoryData?.followers_count}
            type={2}
          />
          <DetailPageItem
            keyItem="Posted"
            value={formatTime(detailStoryData?.createdAt)}
            type={2}
          />
          <DetailPageItem
            keyItem="Rating"
            value={detailStoryData?.rating}
            type={2}
          />
          <div className={styles.detail_page_hero_content_infor_container}>
            <button
              className={`${styles.detail_page_hero_content_infor_btn} ${styles.detail_page_hero_content_infor_btn_read}`}
            >
              <PointerIcon color="#fff" />
              <Link href={`/read-hentai/${detailStoryData?.slug}/chapter-1`} className={styles.detail_page_hero_content_infor_btn_text}>
                Read now
              </Link>
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
