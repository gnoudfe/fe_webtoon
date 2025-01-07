"use client";
import React from "react";
import styles from "./styles.module.scss";
import StoryCard from "../story-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
const SlideStory = () => {
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
        {[...Array(12)].map((_, index) => (
          <SwiperSlide key={index}>
            <StoryCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideStory;
