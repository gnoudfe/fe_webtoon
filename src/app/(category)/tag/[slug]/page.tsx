import CategoryPage from "@/pages/category-page/CategoryPage";
import React from "react";
const TagHentaiPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <CategoryPage slug={slug} type="tag" />;
};

export default TagHentaiPage;
