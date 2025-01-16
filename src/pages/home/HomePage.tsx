import React, { Suspense } from "react";
import styles from "./styles.module.scss";
import SectionHeader from "@/components/ui/section-header";
import ListStory from "@/components/ui/list-story";
import SlideStory from "@/components/ui/slideStory";
import { StoryWebtoonApi } from "@/services/apiRequest";
import ButtonAuth from "@/components/ui/button-auth";
import Sidebar from "@/components/app/sidebar";
import { StoryResponseData } from "@/types/story";
import SidebarSkeleton from "@/components/app/sidebar/sidebar-skeleton";
import ListStorySkeleton from "@/components/ui/list-story/list-story-skeleton";
import SlideStorySkeleton from "@/components/ui/slideStory/slide-story-skeleton";

async function getLatestStories() {
  const response = await StoryWebtoonApi.GetLatestStories({});
  return response;
}

const HomePage = async () => {
  const latestStories: StoryResponseData = await getLatestStories();
  return (
    <div className={styles.home_page}>
      <div className={styles.home_page_sidebar}>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
      </div>
      <div className={styles.home_page_container}>
        <section className={styles.home_page_section}>
          <SectionHeader title="Highlight Manhwa Updates" />
          <Suspense fallback={<SlideStorySkeleton />}>
            <SlideStory />
          </Suspense>
        </section>
        <div className={styles.home_page_seperate}></div>
        <section className={styles.home_page_section}>
          <SectionHeader title="Latest Manhwa Updates" />
          <Suspense fallback={<ListStorySkeleton />}>
            <ListStory />
          </Suspense>
          {latestStories?.data?.length > 15 && (
            <ButtonAuth title="View more" link="/latest" />
          )}
        </section>
      </div>
    </div>
  );
};
export default HomePage;
