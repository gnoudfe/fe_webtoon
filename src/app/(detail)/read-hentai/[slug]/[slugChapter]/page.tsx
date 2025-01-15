import DetailChapter from "@/pages/detail-chapter/DetailChapter";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ slug: string; slugChapter: string }>;
}) => {
  const { slug, slugChapter } = await params;
  return <DetailChapter slug={slug} slugChapter={slugChapter} />;
};

export default page;
