import React from "react";
import styles from "./styles.module.scss";
import { Avatar } from "../avatar";

const CommentSection = () => {
  return (
    <div className={styles.comment_section}>
      <h4 className={styles.comment_section_title}>169 Comments</h4>

      <div className={styles.comment_section_owner}>
        <Avatar
          previewImage={
            "https://nemoitstore.com/cdn/shop/files/4_f2d1afa6-1beb-497d-90c7-388e4c170b4f.jpg?v=1720598788"
          }
          size="lg"
        />
        <input
          type="text"
          placeholder="Write a comment"
          className={styles.comment_section_owner_input}
        />
        <button className={styles.comment_section_owner_cancel_btn}>Cancel</button>
        <button className={styles.comment_section_owner_btn}>Comment</button>
      </div>

      {[...Array(15)].map((_, index) => (
        <CommentItem key={index} />
      ))}
    </div>
  );
};

const CommentItem = () => {
  return (
    <div className={styles.comment_item}>
      <Avatar
        previewImage={
          "https://nemoitstore.com/cdn/shop/files/4_f2d1afa6-1beb-497d-90c7-388e4c170b4f.jpg?v=1720598788"
        }
        size="lg"
      />
      <div className={styles.comment_item_infor}>
        <h5 className={styles.comment_item_infor_title}>
          Username
          <span className={styles.comment_item_infor_date}>5 days ago</span>
        </h5>
        <span className={styles.comment_item_infor_content}>
          Ảnh lúc nào cũng var anh 10 đô, chứ game nào cũng rủ ảnh chơi cùng, AE
          rắn lươn mãi đỉnh
        </span>
      </div>
    </div>
  );
};

export default CommentSection;
