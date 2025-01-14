import React from "react";
import styles from "./styles.module.scss";
import ListStory from "@/components/ui/list-story";
import { mockData } from "@/mock/storyDataMock";
interface CategoryPageProps {
  slug: string;
}

const CategoryPage = ({ slug }: CategoryPageProps) => {
  return (
    <div className={styles.category_page}>
      <div className={styles.category_page_infor}>
        <h1 className={styles.category_page_infor_title}>{slug} </h1>
        <p className={styles.category_page_infor_description}>
          Adventure genre, adventure, often about the journey of the characters
        </p>
      </div>
      <div className={styles.category_page_lists}>
        <ListStory latestStoriesData={mockData} type="category" />
      </div>
    </div>
  );
};

export default CategoryPage;
