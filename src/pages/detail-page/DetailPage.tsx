import React, { Suspense } from "react";
import styles from "./styles.module.scss";
import DetailPageHero from "./_components/detail-page-hero/DetailPageHero";
import SummaryContent from "./_components/summary-content/SummaryContent";
import Sidebar from "@/components/app/sidebar";
import ListChapters from "./_components/list-chapters/ListChapters";
import { Comment, CommentSkeleton } from "@/components/ui/comment";
import HeroSkeleton from "./_components/detail-page-hero/skeleton-hero";
import SummatySkeleton from "./_components/summary-content/summary-skeleton";
import ChapterSkeleton from "./_components/list-chapters/chapters-skeleton";
import SidebarSkeleton from "@/components/app/sidebar/sidebar-skeleton";
interface DetailPageProps {
  slug: string;
}

const DetailPage = async ({ slug }: DetailPageProps) => {
  return (
    <div className={styles.detail_page}>
      <Suspense fallback={<HeroSkeleton />}>
        <DetailPageHero slug={slug} />
      </Suspense>
      <div className={styles.detail_page_content}>
        <div className={styles.detail_page_content_left}>
          <Suspense fallback={<SummatySkeleton />}>
            <SummaryContent slug={slug} />
          </Suspense>
          <Suspense fallback={<ChapterSkeleton />}>
            <ListChapters slug={slug} />
          </Suspense>
          <Suspense fallback={<CommentSkeleton />}>
            <Comment slug={slug} />
          </Suspense>
        </div>
        <div className={styles.detail_page_content_right}>
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
