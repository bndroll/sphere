import { axiosInstance } from "@/api";
import { ShortProfile } from "@/api/services/chat/find-chats.api";

export type findMessagesPostResponse = {
  profileId: string;
  messages: Message[];
};

export type Message = {
  createDate: Date;
  id: string;
  profile: ShortProfile;
  text: string;
};
export const findMessages = async (
  chatId: string,
  userId: string,
  axios = axiosInstance,
) => {
  const { data } = await axios.post<findMessagesPostResponse>(
    `chat/find-messages`,
    {
      chatId,
      userId,
    },
  );

  return data;
};
