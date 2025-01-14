import React from "react";
import styles from "./styles.module.scss";
import DetailPageHero from "./_components/detail-page-hero/DetailPageHero";
import SummaryContent from "./_components/summary-content/SummaryContent";
import Sidebar from "@/components/app/sidebar";
import { StoryWebtoonApi } from "@/services/apiRequest";
import ListChapters from "./_components/list-chapters/ListChapters";
import CommentSection from "@/components/ui/comment";
interface DetailPageProps {
  slug: string;
}

async function getTopStories() {
  const response = await StoryWebtoonApi.GetTopStories({});
  return response;
}

const DetailPage = async ({ slug }: DetailPageProps) => {
  const topStories = await getTopStories();

  return (
    <div className={styles.detail_page}>
      <DetailPageHero />
      <div className={styles.detail_page_content}>
        <div className={styles.detail_page_content_left}>
          <SummaryContent />
          <ListChapters />
          <CommentSection />
        </div>
        <div className={styles.detail_page_content_right}>
          <Sidebar topStoriesData={topStories} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
