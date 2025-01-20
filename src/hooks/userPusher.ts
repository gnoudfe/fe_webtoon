/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Pusher from "pusher-js";
import { NofiticationsDataType } from "@/types/notifications";

export const usePusher = (
  userId: string | undefined,
  onStoryUpdated: (data: NofiticationsDataType) => void
) => {
  useEffect(() => {
    if (!userId) return;
    // Khởi tạo Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    });

    // Đăng ký kênh user
    const channel = pusher.subscribe(`user-${userId}`);
    // Lắng nghe sự kiện "story-updated"
    channel.bind("story-updated", (data: any) => {
      onStoryUpdated(data);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [userId, onStoryUpdated]);
};
