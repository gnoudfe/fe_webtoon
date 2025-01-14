import Footer from "@/components/app/footer";
import Header from "@/components/app/header";
import Sidebar from "@/components/app/sidebar";
import { StoryWebtoonApi } from "@/services/apiRequest";
import React from "react";

async function getTopStories() {
  const response = await StoryWebtoonApi.GetTopStories({});
  return response;
}

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const topStories = await getTopStories();
  return (
    <>
      <Header />
      <main className="layout_root">
        <Sidebar topStoriesData={topStories} />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
