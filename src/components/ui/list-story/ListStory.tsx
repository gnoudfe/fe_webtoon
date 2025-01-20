import React from "react";
import styles from "./styles.module.scss";
import StoryCard from "../story-card";
import { StoryResponseData } from "@/types/story";
import { StoryWebtoonApi } from "@/services/apiRequest";
import ButtonAuth from "../button-auth";

async function getLatestStories() {
  const response = await StoryWebtoonApi.GetLatestStories({});
  return response;
}

const ListStory = async () => {
  const latestStories: StoryResponseData = await getLatestStories();
  return (
    <>
      <div className={`${styles.list_story}`}>
        {latestStories?.data?.map((story) => (
          <StoryCard key={story._id} storyData={story} />
        ))}
      </div>
      {latestStories?.data?.length > 15 && (
        <ButtonAuth title="View more" link="/latest" />
      )}
    </>
  );
};

export default ListStory;
