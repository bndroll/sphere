"use client";
import React from "react";
import { FeedPage } from "@/app/feed/components/FeedPage/FeedPage";
import UserStoreContextProvider from "@/utils/context/UserStoreContext";

export const FeedPageContainer = () => {
  return (
    <UserStoreContextProvider>
      <FeedPage />
    </UserStoreContextProvider>
  );
};
