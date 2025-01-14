import React from "react";
import styles from "./styles.module.scss";
import DetailPageHero from "./_components/detail-page-hero/DetailPageHero";
import SummaryContent from "./_components/summary-content/SummaryContent";
interface DetailPageProps {
  slug: string;
}

const DetailPage = ({ slug }: DetailPageProps) => {
  return (
    <div className={styles.detail_page}>
      <DetailPageHero />
      <div className={styles.detail_page_content}>
        <SummaryContent />
      </div>
    </div>
  );
};

export default DetailPage;
