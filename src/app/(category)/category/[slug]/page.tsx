import CategoryPage from "@/pages/category-page/CategoryPage";
import React from "react";
const CategoryHentaiPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <CategoryPage slug={slug} type="category" />;
};

export default CategoryHentaiPage;
