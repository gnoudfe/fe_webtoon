import React from "react";
const LatestHentaiPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <div>category page {slug}</div>;
};

export default LatestHentaiPage;
