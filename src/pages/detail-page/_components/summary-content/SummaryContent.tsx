import { StoryDetailResponseData } from "@/types/story";
import styles from "./styles.module.scss";
import { StoryWebtoonApi } from "@/services/apiRequest";

interface SummaryContentProps {
  slug: string;
}
async function getDetailStories(slug: string) {
  const response: StoryDetailResponseData =
    await StoryWebtoonApi.GetDetailStories({ slug });
  return response;
}

const SummaryContent = async ({ slug }: SummaryContentProps) => {
  const detailStories = await getDetailStories(slug);
  return (
    <div className={styles.summary_content}>
      <h4 className={styles.summary_content_title}>Summary</h4>
      <span className={styles.summary_content_text}>
        {detailStories?.data?.description}
      </span>
    </div>
  );
};

export default SummaryContent;
