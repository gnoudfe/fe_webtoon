"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import {
  StoryResponseData,
} from "@/types/story";
import StoryCard from "../../story-card";

interface SlideStoryProps {
  highlightStories: StoryResponseData;
}

const SlideStoryList = ({ highlightStories }: SlideStoryProps) => {
  return (
    <div className={styles.slide_story}>
      <Swiper
        modules={[Autoplay]}
        className="mySwiper"
        slidesPerView={5}
        spaceBetween={20}
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={700}
      >
        {highlightStories?.data?.map((story) => (
          <SwiperSlide key={story._id}>
            <StoryCard storyData={story} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideStoryList;
