import React from "react";
import styles from "./styles.module.scss";
import { TagData } from "@/types/tag";
import { Bookmark, PointerIcon } from "lucide-react";
import StoryCard from "@/components/ui/story-card";
import Link from "next/link";
import { formatTime } from "@/utils/formatTime";
import { StoryDetailResponseData } from "@/types/story";
import { StoryWebtoonApi } from "@/services/apiRequest";
async function getDetailStories(slug: string) {
  const response: StoryDetailResponseData =
    await StoryWebtoonApi.GetDetailStories({ slug });
  return response;
}

const DetailPageHero = async ({ slug }: { slug: string }) => {
  const detailStoryData = await getDetailStories(slug);

  return (
    <div className={styles.detail_page_hero}>
      <div className={styles.detail_page_hero_overlay}></div>
      <img src={detailStoryData?.data.thumbnail} alt="" />
      <div className={styles.detail_page_hero_content}>
        <div className={styles.detail_page_hero_content_card}>
          <StoryCard storyData={detailStoryData?.data || {}} type="detail" />
        </div>
        <div className={styles.detail_page_hero_content_infor}>
          <h1 className={styles.detail_page_hero_content_infor_title}>
            {detailStoryData?.data.title}
          </h1>
          <DetailPageItem
            keyItem="Artists"
            value={detailStoryData?.data.author?.name}
          />
          <DetailPageItem keyItem="Tags" data={detailStoryData?.data.tags} />
          <DetailPageItem
            keyItem="Category"
            value={detailStoryData?.data.category?.name}
          />
          <DetailPageItem
            keyItem="Status"
            value={detailStoryData?.data.status}
            type={2}
          />
          <DetailPageItem
            keyItem="Views"
            value={detailStoryData?.data.views}
            type={2}
          />
          <DetailPageItem
            keyItem="Followers"
            value={detailStoryData?.data.followers_count}
            type={2}
          />
          <DetailPageItem
            keyItem="Posted"
            value={formatTime(detailStoryData?.data.createdAt)}
            type={2}
          />
          <DetailPageItem
            keyItem="Rating"
            value={detailStoryData?.data.rating}
            type={2}
          />
          <div className={styles.detail_page_hero_content_infor_container}>
            <button
              className={`${styles.detail_page_hero_content_infor_btn} ${styles.detail_page_hero_content_infor_btn_read}`}
            >
              <PointerIcon color="#fff" />
              <Link
                href={`/read-hentai/${detailStoryData?.data.slug}/chapter-1`}
                className={styles.detail_page_hero_content_infor_btn_text}
              >
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
