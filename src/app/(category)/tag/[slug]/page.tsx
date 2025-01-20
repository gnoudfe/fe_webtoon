import CategoryPage from "@/pages/category-page/CategoryPage";
import React from "react";
const TagContainer = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <CategoryPage slug={slug} type="tag" />;
};

export default TagContainer;
