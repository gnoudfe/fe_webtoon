import React from "react";
import styles from "./styles.module.scss";
import ListStoryCategory from "@/components/ui/list-story/list-story-category";

interface CategoryPageProps {
  slug: string;
  type: "tag" | "category";
}

const CategoryPage = ({ slug, type }: CategoryPageProps) => {
  return (
    <div className={styles.category_page}>
      <div className={styles.category_page_infor}>
        <h1 className={styles.category_page_infor_title}>{slug}</h1>
      </div>
      <div className={styles.category_page_lists}>
        <ListStoryCategory slug={slug} type={type} />
      </div>
    </div>
  );
};

export default CategoryPage;
