import React from "react";
import styles from "./styles.module.scss";
import ListStory from "@/components/ui/list-story";
interface CategoryPageProps {
  slug: string;
}

const mockData = {
  message: "success",
  status: "success",
  data: [
    {
      _id: "1",
      slug: "truyen-gi-do",
      followers_count: 10,
      updatedAt: "2025-01-14T07:36:22.211+00:00",
      rating: 4.5,
      thumbnail:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
      title: "Truyện gì đó",
      views: 15000,
      latestChapter: {
        _id: "1",
        title: "Chương 1",
        time: "2025-01-14T07:36:22.211+00:00",
      },
    },
    {
      _id: "1",
      slug: "truyen-gi-do",
      followers_count: 10,
      updatedAt: "2025-01-14T07:36:22.211+00:00",
      rating: 4.5,
      thumbnail:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
      title: "Truyện gì đó",
      views: 15000,
      latestChapter: {
        _id: "1",
        title: "Chương 1",
        time: "2025-01-14T07:36:22.211+00:00",
      },
    },
    {
      _id: "1",
      slug: "truyen-gi-do",
      followers_count: 10,
      updatedAt: "2025-01-14T07:36:22.211+00:00",
      rating: 4.5,
      thumbnail:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
      title: "Truyện gì đó",
      views: 15000,
      latestChapter: {
        _id: "1",
        title: "Chương 1",
        time: "2025-01-14T07:36:22.211+00:00",
      },
    },
    {
      _id: "1",
      slug: "truyen-gi-do",
      followers_count: 10,
      updatedAt: "2025-01-14T07:36:22.211+00:00",
      rating: 4.5,
      thumbnail:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
      title: "Truyện gì đó",
      views: 15000,
      latestChapter: {
        _id: "1",
        title: "Chương 1",
        time: "2025-01-14T07:36:22.211+00:00",
      },
    },
    {
      _id: "1",
      slug: "truyen-gi-do",
      followers_count: 10,
      updatedAt: "2025-01-14T07:36:22.211+00:00",
      rating: 4.5,
      thumbnail:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
      title: "Truyện gì đó",
      views: 15000,
      latestChapter: {
        _id: "1",
        title: "Chương 1",
        time: "2025-01-14T07:36:22.211+00:00",
      },
    },
    {
      _id: "1",
      slug: "truyen-gi-do",
      followers_count: 10,
      updatedAt: "2025-01-14T07:36:22.211+00:00",
      rating: 4.5,
      thumbnail:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
      title: "Truyện gì đó",
      views: 15000,
      latestChapter: {
        _id: "1",
        title: "Chương 1",
        time: "2025-01-14T07:36:22.211+00:00",
      },
    },
    {
      _id: "1",
      slug: "truyen-gi-do",
      followers_count: 10,
      updatedAt: "2025-01-14T07:36:22.211+00:00",
      rating: 4.5,
      thumbnail:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
      title: "Truyện gì đó",
      views: 15000,
      latestChapter: {
        _id: "1",
        title: "Chương 1",
        time: "2025-01-14T07:36:22.211+00:00",
      },
    },
    {
      _id: "1",
      slug: "truyen-gi-do",
      followers_count: 10,
      updatedAt: "2025-01-14T07:36:22.211+00:00",
      rating: 4.5,
      thumbnail:
        "https://images.inc.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
      title: "Truyện gì đó",
      views: 15000,
      latestChapter: {
        _id: "1",
        title: "Chương 1",
        time: "2025-01-14T07:36:22.211+00:00",
      },
    },
  ],
  pagingation: {
    currentPage: 1,
    totalPages: 1,
    totalStories: 1,
    limit: 10,
  },
};

const CategoryPage = ({ slug }: CategoryPageProps) => {
  return (
    <div className={styles.category_page}>
      <div className={styles.category_page_infor}>
        <h1 className={styles.category_page_infor_title}>{slug} </h1>
        <p className={styles.category_page_infor_description}>Adventure genre, adventure, often about the journey of the characters
        </p>
      </div>
      <div className={styles.category_page_lists}>
        <ListStory latestStoriesData={mockData} type="category" />
      </div>
    </div>
  );
};

export default CategoryPage;
