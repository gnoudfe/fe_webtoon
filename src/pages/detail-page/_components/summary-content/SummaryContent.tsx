import styles from "./styles.module.scss";

interface SummaryContentProps {
  summaryData: string;
}

const SummaryContent = ({ summaryData }: SummaryContentProps) => {
  return (
    <div className={styles.summary_content}>
      <h4 className={styles.summary_content_title}>Summary</h4>
      <span className={styles.summary_content_text}>{summaryData}</span>
    </div>
  );
};

export default SummaryContent;
