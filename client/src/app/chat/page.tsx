"use client";
import styles from "./page.module.scss";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { useRouter } from "next/navigation";
import Transition from "@/components/Transition/Transition";
import cn from "classnames";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChatsResponse, findChats } from "@/api/services/chat/find-chats.api";
import { findMe } from "@/api/services/user/find_me/find_me.api";
import dayjs from "dayjs";

export default function Chat() {
  const router = useRouter();
  const [chats, setChats] = useState<ChatsResponse[]>([]);
  const onMessage = (data: any) => {};

  const getTime = useCallback((date: Date) => {
    return dayjs(date).format("hh:mm");
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const user = await findMe();
      const chats = await findChats(user.id);
      setChats(chats);
    };
    void fetch();
  }, []);

  return (
    <Transition>
      <div className={styles.container}>
        <h2 className={styles.title}>Чаты</h2>
        <div className={styles.chips}>
          <span className={cn(styles.chip, styles.activeChip)}>Все</span>
          <span className={styles.chip}>Анкеты</span>
          <span className={styles.chip}>Эвенты</span>
        </div>
        <div className={styles.items}>
          {chats.map((chat) => (
            <div
              className={styles.item}
              onClick={() => router.push(`/chat/${chat.id}`)}
              key={chat.id}
            >
              {chat.profiles?.[0].info.avatar && (
                <Image
                  src={`https://sphereapp.ru/api/account${chat.profiles?.[0].info.avatar}`}
                  alt={"Image"}
                  width={100}
                  height={100}
                  className={styles.img}
                />
              )}
              <div className={styles.info}>
                <div className={styles.user}>
                  <span className={styles.name}>
                    {chat.profiles?.[0].info.name}
                  </span>
                  <span className={styles.text}>{chat.lastMessage?.text}</span>
                </div>
                <span className={styles.time}>
                  {getTime(chat.lastMessage?.created_date ?? new Date())}
                </span>
              </div>
            </div>
          ))}
        </div>
        <TabBar className={styles.tabBar} tabs={[]} />
      </div>
    </Transition>
  );
}
