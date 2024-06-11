"use client";

import Transition from "@/components/Transition/Transition";
import { usePathname, useRouter } from "next/navigation";
import styles from "./page.module.scss";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { findMessages, Message } from "@/api/services/chat/find-messages.api";
import { useWebSocket } from "@/app/soket";
import { findMe } from "@/api/services/user/find_me/find_me.api";
import { TextInput } from "@/ui/TextInput/TextInput";
import SendSvg from "@/assets/icons/send_msg.svg";
import cn from "classnames";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const [chatId, setChatId] = useState("");
  const [userId, setUserId] = useState("");
  const [profileId, setProfileId] = useState("");
  const [msg, setMsg] = useState("");
  const [text, setText] = useState<string | number>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const onMessage = (data: any) => {
    setMessages((prev) => [JSON.parse(data.data), ...prev]);
  };
  const { handleSendMessage } = useWebSocket({ userId, onMessage });

  const handleSend = useCallback(
    (text: string) => {
      handleSendMessage({
        chatId: chatId,
        profileId: profileId,
        text: text,
      });
      setMsg("");
      setText("");
    },
    [chatId, handleSendMessage, profileId],
  );

  const handleSendBtnClick = useCallback(() => {
    setMsg(text.toString());
    handleSend(text.toString());
  }, [handleSend, text]);

  useEffect(() => {
    const fetch = async () => {
      const chatId = pathname.split("/")[2];
      setChatId(chatId);
      const user = await findMe();
      setUserId(user.id);
      const { messages, profileId } = await findMessages(chatId, user.id);
      setMessages(messages);
      setProfileId(profileId);
    };
    void fetch();
  }, [pathname]);

  const handleBack = useCallback(() => {
    router.push("/chat");
  }, [router]);

  return (
    <Transition>
      <div className={styles.container}>
        <div className={styles.head}>
          <button className={styles.btn} onClick={handleBack}></button>
          <div className={styles.headInfo}>
            {messages?.[0]?.profile && (
              <Image
                src={`https://sphereapp.ru/api/account${messages?.[0]?.profile?.info.avatar}`}
                alt={"Image"}
                width={100}
                height={100}
                className={styles.img}
              />
            )}
            <div className={styles.info}>
              <span className={styles.title}>
                {messages?.[0]?.profile?.info.name}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.chat_area}>
          <div className={styles.chat}>
            {messages.map((msg) => (
              <div
                className={cn(styles.item, {
                  [styles.myMsg]: msg.profile?.id === profileId,
                })}
                key={msg.id}
              >
                <Image
                  src={`https://sphereapp.ru/api/account${msg.profile.info.avatar}`}
                  alt={"Image"}
                  width={100}
                  height={100}
                  className={styles.img}
                />
                <div className={styles.msg}>
                  <span className={styles.name}>{msg.profile.info.name}</span>
                  <span className={styles.text}>{msg.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.input}>
            <TextInput
              value={text}
              onChange={setText}
              placeholder="Сообщение"
            />
            <div className={styles.send_btn} onClick={handleSendBtnClick}>
              <SendSvg />
            </div>
          </div>
        </div>

        <TabBar tabs={[]} className={styles.tabBar} />
      </div>
    </Transition>
  );
}
