import { axiosInstance } from "@/api";

export type ChatsResponse = {
  createDate: Date;
  id: string;
  name: string | null;
  type: "Single" | "Group";
  lastMessage?: ChatLastMessage;
  profiles: ShortProfile[];
};

export type ChatLastMessage = {
  chatId: string;
  created_date: Date;
  text: string;
};

export type ShortProfile = {
  createDate: string;
  id: string;
  info: {
    name: string;
    avatar: string;
  };
  profileId: string;
  userId: string;
};

export const findChats = async (userId: string, axios = axiosInstance) => {
  const { data } = await axios.get<ChatsResponse[]>(
    `chat/find-chats/${userId}`,
  );

  return data;
};
