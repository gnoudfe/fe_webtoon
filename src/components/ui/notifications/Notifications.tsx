"use client";
import { BellRing } from "lucide-react";
import React from "react";
import styles from "./styles.module.scss";
import { Avatar } from "../avatar";
import useDetectClickOutside from "@/hooks/useDetectClickOutside";
import {
  useGetNotifications,
  useMarkNotifications,
} from "@/services/queries/useStory";
import { NofiticationsDataType } from "@/types/notifications";
import Link from "next/link";
import { formatTime } from "@/utils/formatTime";
import { usePusher } from "@/hooks/userPusher";

const Notifications = ({ userId }: { userId: string }) => {
  const [isShow, setIsShow] = React.useState(false);
  const [notifications, setNotifications] = React.useState<
    NofiticationsDataType[]
  >([]);

  const { data: notificationsData } = useGetNotifications();

  const notificationsMutate = useMarkNotifications();

  // Xử lý khi có thông báo mới qua Pusher
  const handleStoryUpdated = (data: NofiticationsDataType) => {
    setNotifications((prev) => [data, ...prev]); // Thêm thông báo mới vào đầu danh sách
  };

  // Sử dụng hook usePusher để lắng nghe sự kiện real-time
  usePusher(userId, handleStoryUpdated);

  // Cập nhật thông báo khi dữ liệu ban đầu được tải
  React.useEffect(() => {
    if (notificationsData?.data) {
      setNotifications(notificationsData.data);
    }
  }, [notificationsData]);

  const handleReadNotification = async (notifId: string) => {
    try {
      await notificationsMutate.mutateAsync({ notifId });
    } catch (error) {
      console.log(error);
    }
  };

  const unReadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );

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
      {unReadNotifications.length ? (
        <NotificationsNew
          totalUnReadNotifications={unReadNotifications.length}
        />
      ) : null}
      <NotificationsInfor
        isShow={isShow}
        setIsShow={setIsShow}
        notificationsData={notifications}
        handleReadNotification={handleReadNotification}
      />
    </div>
  );
};

interface NotificationsInforProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  notificationsData: NofiticationsDataType[];
  handleReadNotification?: (notifId: string) => void;
}

const NotificationsInfor = ({
  isShow,
  setIsShow,
  notificationsData,
  handleReadNotification,
}: NotificationsInforProps) => {
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
      {notificationsData.map((notification, index) => (
        <NotificationsInforItem
          key={index}
          notification={notification}
          handleReadNotification={handleReadNotification}
        />
      ))}
      {notificationsData?.length === 0 ? (
        <div className={styles.header_auth_notifications_infor_empty}>
          <span className={styles.header_auth_notifications_infor_empty_title}>
            No notifications!
          </span>
        </div>
      ) : null}
    </div>
  );
};

interface NotificationsInforItemProps {
  notification: NofiticationsDataType;
  handleReadNotification?: (notifId: string) => void;
}

const NotificationsInforItem = ({
  notification,
  handleReadNotification,
}: NotificationsInforItemProps) => {
  return (
    <Link
      href={`/read/${notification?.link}`}
      className={styles.header_auth_notifications_infor_item}
      onClick={() => handleReadNotification?.(notification._id)}
    >
      <Avatar previewImage={notification?.thumbnail} size="lg" />
      <div className={styles.header_auth_notifications_infor_item_content}>
        <span
          className={styles.header_auth_notifications_infor_item_content_title}
        >
          {notification?.message}
        </span>
        <span
          className={styles.header_auth_notifications_infor_item_content_time}
        >
          {formatTime(notification?.createdAt)}
        </span>
      </div>
      {!notification?.isRead && (
        <div className={styles.header_auth_notifications_infor_item_dot}></div>
      )}
    </Link>
  );
};

const NotificationsNew = ({
  totalUnReadNotifications,
}: {
  totalUnReadNotifications: number | null;
}) => {
  return (
    <div className={styles.header_auth_notifications_new}>
      <span>{totalUnReadNotifications}</span>
    </div>
  );
};

export { Notifications };
