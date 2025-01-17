"use client";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import { ChapterResponseData, ChapterType } from "@/types/chapter";
import { Menu } from "lucide-react";
import StickyPage from "../sticky-page";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";

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

  // Sử dụng debounce để giảm tần suất cập nhật trạng thái
  const debounceSetShowStickyPage = useDebounce((value: boolean) => {
    setShowStickyPage(value);
  }, 100); // Độ trễ là 100ms

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isAboveViewport = entry.boundingClientRect.bottom < 0; // Phần tử đã trượt khỏi màn hình
        const isBelowViewport =
          entry.boundingClientRect.top > window.innerHeight; // Phần tử nằm dưới màn hình
        debounceSetShowStickyPage(isAboveViewport || isBelowViewport);
      },
      {
        threshold: 0, // Kích hoạt ngay khi phần tử bắt đầu rời khỏi viewport
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
      <StickyPage
        chapterDetailData={chapterDetailData}
        show={showStickyPage}
        storyTitle={chapterDetailData?.data?.currentChapter?.story_id?.title}
        storySlug={chapterDetailData?.data?.currentChapter?.story_id?.slug}

      />
      <div className={styles.detail_chapter_infor} ref={scrollRef}>
        <h4 className={styles.detail_chapter_infor_nav}>
          <Link
            href={`/read-hentai/${chapterDetailData?.data?.currentChapter?.story_id?.slug}`}
            className={styles.detail_chapter_infor_nav_text}
          >
            {chapterDetailData?.data?.currentChapter?.story_id?.title}
          </Link>
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
