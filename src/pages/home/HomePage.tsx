import React from "react";
import styles from "./styles.module.scss";
import SectionHeader from "@/components/ui/section-header";
import ListStory from "@/components/ui/list-story";
import SlideStory from "@/components/ui/slideStory";
import { StoryWebtoonApi } from "@/services/apiRequest";
import ButtonAuth from "@/components/ui/button-auth";

async function getLatestStories() {
  const response = await StoryWebtoonApi.GetLatestStories({});
  return response;
}

async function getHighlightStories() {
  const response = await StoryWebtoonApi.GetHighlightStories({});
  return response;
}



const HomePage = async () => {
  const latestStories = await getLatestStories();
  const highlightStories = await getHighlightStories();
 
  return (
    <div className={styles.home_page}>
      <section className={styles.home_page_section}>
        <SectionHeader title="Highlight Manhwa Updates" />
        <SlideStory  highlightStories={highlightStories}/>
      </section>
      <div className={styles.home_page_seperate}></div>
      <section className={styles.home_page_section}>
        <SectionHeader title="Latest Manhwa Updates" />
        <ListStory latestStoriesData={latestStories} />
        <ButtonAuth title="View more" link="/latest" />
      </section>
    </div>
  );
};
export default HomePage;
