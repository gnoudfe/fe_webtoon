/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import styles from "./styles.module.scss";
import { LogOutIcon, Settings2Icon } from "lucide-react";
import { useLogoutMutation } from "@/services/queries/useAuth";
import Link from "next/link";

interface AvatarProps {
  userData?: {
    _id?: string;
    username: string;
    readingHistory?: string[];
    followedStories?: string[];
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  previewImage?: string | null;
  isShow?: boolean;
  isShowInfor?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const Avatar = ({
  userData,
  previewImage,
  isShowInfor = false,
  size = "md",
}: AvatarProps) => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const handleClickAvatar = () => {
    if (!isShowInfor) return;
    setIsShow((prev) => !prev);
  };
  return (
    <div
      className={`${styles.header_avatar} ${styles[`header_avatar_${size}`]}`}
      onClick={handleClickAvatar}
    >
      <img
        src={previewImage ? previewImage : userData?.avatar}
        alt="avatar user"
      />
      {isShowInfor && <AvatarInfor isShow={isShow} userData={userData} />}
    </div>
  );
};

const AvatarInfor = ({ isShow, userData }: AvatarProps) => {
  const logoutMutation = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <div
      className={`${styles.header_avatar_infor} ${
        isShow && styles.header_avatar_infor_active
      }`}
    >
      <div className={styles.header_avatar_infor_user}>
        <div className={styles.header_avatar_infor_user_avatar}>
          <img src={userData?.avatar} alt="" />
        </div>
        <p className={styles.header_avatar_infor_user_name}>
          {userData?.username}
        </p>
      </div>
      <div className={styles.header_avatar_infor_seperate}></div>
      <Link href="/settings" className={styles.header_avatar_infor_lists_item}>
        <Settings2Icon size={20} color="#000" />
        <p className={styles.header_avatar_infor_lists_item_text}>Settings</p>
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
