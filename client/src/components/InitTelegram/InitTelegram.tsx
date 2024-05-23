"use client";
import { useGetProfile } from "@/api/services/profile/profile.hooks";

export const InitTelegram = () => {
  const { data } = useGetProfile("a");
  return <div>{data?.data}asdasd</div>;
};
