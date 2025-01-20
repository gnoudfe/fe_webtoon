"use client";
import React from "react";
import styles from "./styles.module.scss";
import { StoryWebtoonApi } from "@/services/apiRequest";

const AddNewStory = () => {
  const [url, setUrl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Hàm kiểm tra URL hợp lệ
  const isValidUrl = (url: string) => {
    const regex = /^https:\/\/hentai18\.net\/read-hentai\/[\w-]+$/;
    return regex.test(url);
  };

  const handleScrapeStory = async () => {
    if (isLoading) return;

    // Kiểm tra URL
    if (!isValidUrl(url)) {
      setError(
        "URL must be in the format https://hentai18.net/read-hentai/:slug"
      );
      return;
    }

    setError(""); // Xóa lỗi trước đó
    try {
      setIsLoading(true);
      const response = await StoryWebtoonApi.ScrapeStory({ url });
      if (response && response.status === "success") {
        alert("Scrape story successfully. Please refresh the page.");
      } else {
        alert("Scrape story failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.add_new}>
      <input
        type="text"
        className={styles.add_new_story}
        placeholder="Scrape story"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      {error && <p className={styles.error_message}>{error}</p>}
      <button
        className={styles.add_new_story_button}
        onClick={handleScrapeStory}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Scrape"}
      </button>
    </div>
  );
};

export default AddNewStory;
