import React from "react";
import styles from "./styles.module.scss";
import DetailPageHero from "./_components/detail-page-hero/DetailPageHero";
import SummaryContent from "./_components/summary-content/SummaryContent";
import Sidebar from "@/components/app/sidebar";
import { StoryWebtoonApi } from "@/services/apiRequest";
import ListChapters from "./_components/list-chapters/ListChapters";
import { StoryDetailResponseData } from "@/types/story";
import { CommentResponse } from "@/types/comment";
import { CommentSection } from "@/components/ui/comment";
interface DetailPageProps {
  slug: string;
}

async function getTopStories() {
  const response = await StoryWebtoonApi.GetTopStories({});
  return response;
}
async function getDetailStories(slug: string) {
  const response: StoryDetailResponseData =
    await StoryWebtoonApi.GetDetailStories({ slug });
  return response;
}

async function getCommentsStory(slug: string) {
  const response: CommentResponse = await StoryWebtoonApi.GetCommentsStory({
    slug,
  });
  return response;
}

const DetailPage = async ({ slug }: DetailPageProps) => {
  const topStories = await getTopStories();
  const detailStories = await getDetailStories(slug);
  const commentStory = await getCommentsStory(slug);
  return (
    <div className={styles.detail_page}>
      <DetailPageHero detailStoryData={detailStories?.data} />
      <div className={styles.detail_page_content}>
        <div className={styles.detail_page_content_left}>
          <SummaryContent summaryData={detailStories?.data?.description} />
          <ListChapters
            chaptersData={detailStories?.data?.chapters}
            storySlug={detailStories?.data?.slug}
          />
          <CommentSection
            commentsData={commentStory?.data}
            isAddComment={false}
          />
        </div>
        <div className={styles.detail_page_content_right}>
          <Sidebar topStoriesData={topStories} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
