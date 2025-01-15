"use client";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { ChapterResponseData, ChapterType } from "@/types/chapter";
import { Menu } from "lucide-react";
import StickyPage from "../sticky-page";
import Link from "next/link";

interface DetailChapterInforProps {
  chapterDetailData: ChapterResponseData;
  type: 1 | 2;
}

const DetailChapterInfor = ({
  chapterDetailData,
  type,
}: DetailChapterInforProps) => {
  const [showStickyPage, setShowStickyPage] = React.useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyPage(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );
    observerRef.current = observer;

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      {showStickyPage && <StickyPage chapterDetailData={chapterDetailData} />}
      <div className={styles.detail_chapter_infor} ref={scrollRef}>
        <h4 className={styles.detail_chapter_infor_nav}>
          <span className={styles.detail_chapter_infor_nav_text}>
            {chapterDetailData?.data?.currentChapter?.story_id?.title}
          </span>
          <span className={styles.detail_chapter_infor_nav_line}>/</span>
          <span className={styles.detail_chapter_infor_nav_text}>
            {chapterDetailData?.data?.currentChapter?.title}
          </span>
        </h4>
        <span className={styles.detail_chapter_infor_time}>
          Updated at {chapterDetailData?.data?.currentChapter?.time}
        </span>
        <DetailChapterButton
          type={type}
          chapterDetailData={chapterDetailData}
        />
      </div>
    </>
  );
};

interface DetailChapterButtonProps {
  chapterDetailData: ChapterResponseData;
  type?: 1 | 2;
}

const DetailChapterButton = ({
  chapterDetailData,
  type,
}: DetailChapterButtonProps) => {
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const handleToggleMenu = () => {
    setIsShowMenu((prev) => !prev);
  };

  const currentIndex = chapterDetailData?.data?.chapters.findIndex(
    (chapter) => chapter.slug === chapterDetailData?.data?.currentChapter?.slug
  );
  const previousChapter =
    currentIndex === chapterDetailData?.data?.chapters?.length - 1
      ? ""
      : chapterDetailData?.data?.chapters[currentIndex + 1].slug;
  const nextChapter =
    currentIndex === 0
      ? ""
      : chapterDetailData?.data?.chapters[currentIndex - 1].slug;
  return (
    <div className={styles.detail_chapter_buttons}>
      {currentIndex === chapterDetailData?.data?.chapters.length - 1 ? (
        <div
          className={`${styles.detail_chapter_buttons_btn} ${styles.detail_chapter_buttons_btn_disable}`}
        >
          Previous Chapter
        </div>
      ) : (
        <Link
          href={`/read-hentai/${chapterDetailData?.data?.currentChapter?.story_id.slug}/${previousChapter}`}
          className={styles.detail_chapter_buttons_btn}
        >
          Previous Chapter
        </Link>
      )}
      <div className={styles.detail_chapter_buttons_container}>
        <div
          className={styles.detail_chapter_buttons_btn}
          onClick={handleToggleMenu}
        >
          <Menu />
        </div>
        <DetailChapterMenuSelect
          type={type}
          isShowMenu={isShowMenu}
          chapterLists={chapterDetailData?.data?.chapters}
          storySlug={chapterDetailData?.data?.currentChapter?.story_id?.slug}
        />
      </div>
      {currentIndex === 0 ? (
        <div
          className={`${styles.detail_chapter_buttons_btn} ${styles.detail_chapter_buttons_btn_disable}`}
        >
          Next Chapter
        </div>
      ) : (
        <Link
          href={`/read-hentai/${chapterDetailData?.data?.currentChapter?.story_id.slug}/${nextChapter}`}
          className={styles.detail_chapter_buttons_btn}
        >
          Next Chapter
        </Link>
      )}
    </div>
  );
};

interface DetailChapterMenuSelectProps {
  chapterLists: ChapterType[];
  isShowMenu: boolean;
  storySlug: string;
  type?: 1 | 2;
}

const DetailChapterMenuSelect = ({
  chapterLists,
  isShowMenu,
  type = 1,
  storySlug,
}: DetailChapterMenuSelectProps) => {
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (menuRef.current && isShowMenu && type === 1) {
      menuRef.current.scrollTop = menuRef.current.scrollHeight;
    }
  }, [isShowMenu, type]);

  return isShowMenu ? (
    <ul
      ref={menuRef}
      className={`${styles.detail_chapter_menu} ${
        type === 2 ? `${styles.detail_chapter_menu_reverse}` : ""
      }`}
    >
      {chapterLists?.map((chapter) => (
        <Link
          href={`/read-hentai/${storySlug}/${chapter?.slug}`}
          className={styles.detail_chapter_menu_item}
          key={chapter?._id}
        >
          {chapter?.title}
        </Link>
      ))}
    </ul>
  ) : null;
};

export { DetailChapterInfor, DetailChapterButton };
