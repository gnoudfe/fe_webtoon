import React from "react";
import styles from "./styles.module.scss";
import SectionHeader from "@/components/ui/section-header";
import ListStory from "@/components/ui/list-story";
import SlideStory from "@/components/ui/slideStory";
import { StoryWebtoonApi } from "@/services/apiRequest";
import ButtonAuth from "@/components/ui/button-auth";
import Sidebar from "@/components/app/sidebar";
import { StoryResponseData } from "@/types/story";

async function getLatestStories() {
  const response = await StoryWebtoonApi.GetLatestStories({});
  return response;
}

async function getHighlightStories() {
  const response = await StoryWebtoonApi.GetHighlightStories({});
  return response;
}

const HomePage = async () => {
  const latestStories: StoryResponseData = await getLatestStories();
  const highlightStories: StoryResponseData = await getHighlightStories();
  return (
    <div className={styles.home_page}>
      <div className={styles.home_page_sidebar}>
        <Sidebar />
      </div>
      <div className={styles.home_page_container}>
        <section className={styles.home_page_section}>
          <SectionHeader title="Highlight Manhwa Updates" />
          <SlideStory highlightStories={highlightStories} />
        </section>
        <div className={styles.home_page_seperate}></div>
        <section className={styles.home_page_section}>
          <SectionHeader title="Latest Manhwa Updates" />
          <ListStory latestStoriesData={latestStories} />
          {latestStories?.data?.length > 15 && (
            <ButtonAuth title="View more" link="/latest" />
          )}
        </section>
      </div>
    </div>
  );
};
export default HomePage;
