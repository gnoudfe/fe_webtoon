"use client";
import { BellRing } from "lucide-react";
import React from "react";
import styles from "./styles.module.scss";
import { Avatar } from "../avatar";
import useDetectClickOutside from "@/hooks/useDetectClickOutside";
const Notifications = () => {
  const [isShow, setIsShow] = React.useState(false);
  const handleClickAvatar = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <div className={styles.header_auth_notifications_wrapper}>
      <div
        className={styles.header_auth_notifications}
        onClick={handleClickAvatar}
      >
        <BellRing color="#fff" width={18} height={18} />
      </div>
      <NotificationsNew />
      <NotificationsInfor isShow={isShow} setIsShow={setIsShow} />
    </div>
  );
};

interface NotificationsInforProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationsInfor = ({ isShow, setIsShow }: NotificationsInforProps) => {
  const notificationInforRefs = React.useRef<HTMLDivElement | null>(null);

  useDetectClickOutside(notificationInforRefs, () => {
    if (isShow) setIsShow(false);
  });
  return (
    <div
      ref={notificationInforRefs}
      className={`${styles.header_auth_notifications_infor} ${
        isShow ? styles.header_auth_notifications_infor_active : null
      }`}
    >
      <NotificationsInforItem />
      <NotificationsInforItem />
    </div>
  );
};

const NotificationsInforItem = () => {
  return (
    <div className={styles.header_auth_notifications_infor_item}>
      <Avatar
        previewImage={
          "https://nemoitstore.com/cdn/shop/files/4_f2d1afa6-1beb-497d-90c7-388e4c170b4f.jpg?v=1720598788"
        }
        size="lg"
      />
      <div className={styles.header_auth_notifications_infor_item_content}>
        <span
          className={styles.header_auth_notifications_infor_item_content_title}
        >
          The story Stop Smoking has been updated
        </span>
        <span
          className={styles.header_auth_notifications_infor_item_content_time}
        >
          1 min ago
        </span>
      </div>
    </div>
  );
};

const NotificationsNew = () => {
  return (
    <div className={styles.header_auth_notifications_new}>
      <span>1</span>
    </div>
  );
};

export { Notifications };
