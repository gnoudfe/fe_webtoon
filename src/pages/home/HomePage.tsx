import React, { Suspense } from "react";
import styles from "./styles.module.scss";
import SectionHeader from "@/components/ui/section-header";
import ListStory from "@/components/ui/list-story";
import SlideStory from "@/components/ui/slideStory";
import Sidebar from "@/components/app/sidebar";
import SidebarSkeleton from "@/components/app/sidebar/sidebar-skeleton";
import ListStorySkeleton from "@/components/ui/list-story/list-story-skeleton";
import SlideStorySkeleton from "@/components/ui/slideStory/slide-story-skeleton";
import AddNewStory from "./add-new-story";

const HomePage = async () => {
  return (
    <div className={styles.home_page}>
      <div className={styles.home_page_sidebar}>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
      </div>
      <div className={styles.home_page_container}>
        <AddNewStory />
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
        </section>
      </div>
    </div>
  );
};
export default HomePage;
