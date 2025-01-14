import CategoryPage from "@/pages/category-page/CategoryPage";
import React from "react";
const LatestHentaiPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <CategoryPage slug={slug} />;
};

export default LatestHentaiPage;
