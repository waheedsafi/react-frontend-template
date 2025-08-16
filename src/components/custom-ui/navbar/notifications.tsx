import { Bell } from "lucide-react";
import { memo, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import axiosClient from "@/lib/axois-client";
import type { Notification } from "@/database/models";
import { toast } from "sonner";
import { useSocketEvent } from "@/hook/use-socket-event";
import Shimmer from "@/components/custom-ui/shimmer/shimmer";
import { cn } from "@/lib/utils";

function Notifications() {
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState<{
    items: Notification[];
    submitted: boolean;
    unreadCount: number;
  }>({
    items: [],
    submitted: true,
    unreadCount: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [storing, setStoring] = useState<boolean>(false);
  const onNotification = (data: Notification) => {
    setNotifications((prev) => ({
      submitted: false,
      unreadCount: prev.unreadCount == 0 ? 1 : prev.unreadCount + 1,
      items: [data, ...prev.items],
    }));
  };
  useSocketEvent("notification", onNotification);
  const initialize = async () => {
    try {
      const response = await axiosClient.get("notifications");
      if (response.status == 200) {
        setNotifications({
          items: response.data.notifications,
          submitted: response.data.unread_count == 0 ? true : false,
          unreadCount: response.data.unread_count,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    initialize();
  }, []);

  const year = t("year");
  const month = t("month");
  const day = t("day");
  const hour = t("hour");
  const minute = t("minute");
  const ago = t("ago");
  const justNow = t("just_now");
  const direction = i18n.dir();
  const notificationReadSubmit = async () => {
    if (storing) return;

    if (!notifications.submitted) {
      try {
        setStoring(true);
        const arr: string[] = [];
        notifications.items.forEach((item: Notification) => {
          if (!item.is_read) arr.push(item.id);
        });
        const response = await axiosClient.put("notifications", {
          ids: arr,
        });
        if (response.status == 200) {
          setNotifications((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
              !item.is_read ? { ...item, is_read: true } : item
            ),
            submitted: true,
            unreadCount: 0,
          }));
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setStoring(false);
      }
    }
  };

  return (
    <DropdownMenu dir={direction} onOpenChange={notificationReadSubmit}>
      <DropdownMenuTrigger asChild>
        <div className="ltr:mr-3 rtl:ml-2 mt-[6px] relative select-none cursor-pointer">
          <Bell className="fill-primary size-[18px]" />
          {notifications.unreadCount != 0 && (
            <h1 className="absolute my-auto top-[-6px] ltr:right-[-6px] rtl:right-[-6px] shadow-md font-bold min-h-[16px] max-w-[18px] min-w-[17px] text-center text-primary-foreground bg-red-400 text-[10px] rounded-full">
              {notifications.unreadCount}
            </h1>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[50svh] w-[200px] sm:w-[300px] backdrop-blur-md z-40 overflow-y-auto rtl:text-md-rtl ltr:text-lg-ltr">
        <DropdownMenuLabel>
          <h1>{t("notifications")}</h1>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          <>
            <Shimmer className="h-10" />
            <Shimmer className="h-10 mt-2" />
          </>
        ) : notifications.items.length == 0 ? (
          <h1 className="text-center py-4">{t("no_notification")}</h1>
        ) : (
          notifications.items.map((item: Notification, index: number) => (
            <DropdownMenuItem
              className={cn(
                "rtl:justify-end rounded-none hover:bg-primary/5",
                index != 0 && "border-t"
              )}
              key={index}
            >
              <NotificationItem
                item={item}
                year={year}
                month={month}
                day={day}
                hour={hour}
                minute={minute}
                ago={ago}
                justNow={justNow}
              />
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const NotificationItem = ({
  item,
  year,
  month,
  day,
  hour,
  minute,
  ago,
  justNow,
}: any) => {
  const calculateCreatedHours = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();

    const diffInMs = currentDate.getTime() - createdDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert milliseconds to minutes
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60)); // Convert milliseconds to hours
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30)); // Approximate months
    const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365)); // Approximate years

    if (diffInYears > 0) {
      return `${diffInYears} ${year}${diffInYears !== 1 ? "s" : ""} ${ago}`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${month}${diffInMonths !== 1 ? "s" : ""} ${ago}`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${day}${diffInDays !== 1 ? "s" : ""} ${ago}`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${hour}${diffInHours !== 1 ? "s" : ""} ${ago}`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${minute}${
        diffInMinutes !== 1 ? "s" : ""
      } ${ago}`;
    } else {
      return justNow;
    }
  };
  return (
    <div
      className={cn(
        "flex flex-col cursor-pointer items-start p-1 gap-x-[2px] w-full relative",
        !item.is_read && "bg-slate-400/15 rounded-md"
      )}
    >
      <h1 className="flex-1 line-clamp-2">{item.message}</h1>
      <h1 className="text-primary/80">
        {calculateCreatedHours(item.created_at)}
      </h1>
    </div>
  );
};
export default memo(Notifications);
