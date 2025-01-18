import React from "react";
import styles from "./styles.module.scss";
import { StoryWebtoonApi } from "@/services/apiRequest";
import { ChapterResponseData } from "@/types/chapter";
import { DetailChapterInfor } from "./chapter-infor/DetailChapterInfor";
import ScrollToTop from "@/components/ui/scrollToTop";
import CommentSectionChapter from "@/components/ui/comment/comment-section/comment-section-chapter";

interface DetailChapterProps {
  slug: string;
  slugChapter: string;
}

async function getChapterDetail({
  slug,
  slugChapter,
}: {
  slug: string;
  slugChapter: string;
}) {
  const response: ChapterResponseData = await StoryWebtoonApi.GetChapterDetail({
    slug,
    slugChapter,
  });
  return response;
}

const DetailChapter = async ({ slug, slugChapter }: DetailChapterProps) => {
  const chapterDetailData = await getChapterDetail({ slug, slugChapter });
  return (
    <div className={styles.detail_chapter}>
      <DetailChapterInfor type={2} chapterDetailData={chapterDetailData} />
      <div className={styles.detail_chapter_content}>
        {chapterDetailData?.data?.currentChapter?.images?.map(
          (image, index) => (
            <img src={image} alt="" key={index} />
          )
        )}
      </div>
      <div className={styles.detail_chapter_comment}>
        <CommentSectionChapter
          chapterId={chapterDetailData?.data?.currentChapter?._id}
          storySlug={chapterDetailData?.data?.currentChapter?.story_id?.slug}
          slugChapter={slugChapter}
        />
      </div>
      <ScrollToTop />
    </div>
  );
};

export default DetailChapter;
