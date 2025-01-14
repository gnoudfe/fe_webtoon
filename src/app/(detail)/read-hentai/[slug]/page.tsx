import DetailPage from "@/pages/detail-page/DetailPage";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <DetailPage  slug={slug}/>;
};

export default page;
