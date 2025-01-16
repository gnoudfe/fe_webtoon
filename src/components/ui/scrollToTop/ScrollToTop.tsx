"use client";
import React from "react";
import styles from "./styles.module.scss";
import { ArrowUpCircle } from "lucide-react";
const ScrollToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.scroll_to_top} onClick={handleScrollToTop}>
      <ArrowUpCircle color="#fff" />
    </div>
  );
};

export default ScrollToTop;
