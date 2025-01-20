
"use client";
import React, { useState, useRef } from "react";
import styles from "./styles.module.scss";
import {
  ArchiveIcon,
  HistoryIcon,
  LogOutIcon,
  Settings2Icon,
} from "lucide-react";
import { useLogoutMutation } from "@/services/queries/useAuth";
import Link from "next/link";
import useDetectClickOutside from "@/hooks/useDetectClickOutside";

interface UserData {
  _id?: string;
  username: string;
  readingHistory?: string[];
  followedStories?: string[];
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AvatarProps {
  userData?: UserData;
  previewImage?: string | null;
  isShowInfor?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Avatar: React.FC<AvatarProps> = ({
  userData,
  previewImage,
  isShowInfor = false,
  size = "md",
}) => {
  const [isShow, setIsShow] = useState(false);

  const handleClickAvatar = () => {
    if (isShowInfor) setIsShow((prev) => !prev);
  };

  return (
    <div
      className={`${styles.header_avatar} ${styles[`header_avatar_${size}`]}`}
      onClick={handleClickAvatar}
    >
      <img
        src={previewImage || userData?.avatar || "/default-avatar.png"}
        alt="User Avatar"
      />
    
      {isShowInfor && (
        <AvatarInfor
          isShow={isShow}
          userData={userData}
          setIsShow={setIsShow}
        />
      )}
    </div>
  );
};

interface AvatarInforProps {
  isShow: boolean;
  userData?: UserData;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarInfor: React.FC<AvatarInforProps> = ({
  isShow,
  userData,
  setIsShow,
}) => {
  const logoutMutation = useLogoutMutation();
  const avatarInforRef = useRef<HTMLDivElement | null>(null);
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useDetectClickOutside(avatarInforRef, () => {
    if (isShow) setIsShow(false);
  });

  return (
    <div
      ref={avatarInforRef}
      className={`${styles.header_avatar_infor} ${
        isShow ? styles.header_avatar_infor_active : ""
      }`}
    >
      <div
        className={styles.header_avatar_infor_user}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header_avatar_infor_user_avatar}>
          <img
            src={userData?.avatar || "/default-avatar.png"}
            alt="User Avatar"
          />
        </div>
        <p className={styles.header_avatar_infor_user_name}>
          {userData?.username}
        </p>
      </div>
      <div className={styles.header_avatar_infor_separate}></div>
      <Link href="/settings" className={styles.header_avatar_infor_lists_item}>
        <Settings2Icon size={20} color="#000" />
        <p className={styles.header_avatar_infor_lists_item_text}>Settings</p>
      </Link>
      <Link href="/following" className={styles.header_avatar_infor_lists_item}>
        <ArchiveIcon size={20} color="#000" />
        <p className={styles.header_avatar_infor_lists_item_text}>
          My Follow Stories
        </p>
      </Link>
      <Link href="/history" className={styles.header_avatar_infor_lists_item}>
        <HistoryIcon size={20} color="#000" />
        <p className={styles.header_avatar_infor_lists_item_text}>My History</p>
      </Link>
      <div
        className={styles.header_avatar_infor_lists_item}
        onClick={handleLogout}
      >
        <LogOutIcon size={20} />
        <p className={styles.header_avatar_infor_lists_item_text}>Log out</p>
      </div>
    </div>
  );
};

export { Avatar, AvatarInfor };
