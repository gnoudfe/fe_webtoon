import React from "react";
import SlideStoryList from "./slide-story-list";
import { StoryWebtoonApi } from "@/services/apiRequest";
import { StoryResponseData } from "@/types/story";
async function getHighlightStories() {
  const response = await StoryWebtoonApi.GetHighlightStories({});
  return response;
}

const SlideStory = async () => {
  const highlightStories: StoryResponseData = await getHighlightStories();
  return <SlideStoryList highlightStories={highlightStories} />;
};

export default SlideStory;
