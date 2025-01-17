import TypeStoryPage from "@/pages/type-story-page";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <TypeStoryPage type={slug as "latest" | "top" | "highlight" | "all"} />
  );
};

export default page;
