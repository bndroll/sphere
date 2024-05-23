'use client'
import Header from '@/app/profile/components/Header/Header';
import YaSvg from '@/assets/icons/yandex.svg';
import business from "@/assets/images/business.png";
import { Button } from "@/ui/Button/Button";
import UserSvg from "@/assets/icons/userPurple.svg";
import EventSvg from "@/assets/icons/event.svg";
import styles from "./page.module.scss";
import LanguageSvg from "@/assets/icons/language.svg";
import PrivateSvg from "@/assets/icons/private.svg";
import BustSvg from "@/assets/icons/bust.svg";
import List from "@/app/profile/components/List/List";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { useRouter } from "next/navigation";
import Transition from "@/components/Transition/Transition";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  UserMappingProfile,
  UserStoreContext,
} from "@/utils/context/UserStoreContext";

export default function Profile() {
  const router = useRouter();
  const [allUsersProfilies, setUsersProfilies] = useState<UserMappingProfile[]>(
    [],
  );

  const { usersProfilies } = useContext(UserStoreContext);

  useEffect(() => {
    setUsersProfilies(usersProfilies);
  }, [usersProfilies]);

  const items = useCallback(() => {
    return allUsersProfilies.map((profile) => {
      return {
        text: `${profile.name} анкета`,
        icon: profile.icon,
        onClick: () => router.push(`/profile/${profile.categoryId}`),
      };
    });
  }, [allUsersProfilies]);

  const settingsItems = [
    {
      icon: <LanguageSvg />,
      text: "Язык",
    },
    {
      icon: <PrivateSvg />,
      text: "Приватность",
    },
  ];

  return (
    <Transition>
      <div className={styles.container}>
        <Header
          iconCompany={<YaSvg />}
          iconUserSrc={business}
          userNickname={"@valentinaa"}
          userName={"Валентина"}
        />
        <Button
          text={"Редактировать профиль"}
          onClick={() => router.push("/profile/edit")}
          variant={"secondary"}
          IconLeft={UserSvg}
          justify={"start"}
          className={styles.btn}
        />
        <List items={items()} />
        <Button
          text={"Управление эвентами"}
          onClick={() => router.push("/profile/events")}
          variant={"secondary"}
          IconLeft={EventSvg}
          justify={"start"}
          className={styles.btn}
        />
        <Button
          text={"Буст анкеты"}
          onClick={() => console.log("")}
          variant={"secondary"}
          IconLeft={BustSvg}
          justify={"space-between"}
          disabled={true}
          className={styles.btnDisabled}
          IconRight={() => <span className={styles.btnText}>Скоро</span>}
        />
        <List items={settingsItems} />
        <TabBar className={styles.tabBar} tabs={[]} />
      </div>
    </Transition>
  );
}