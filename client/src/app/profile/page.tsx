"use client";
import Header from "@/app/profile/components/Header/Header";
import YaSvg from "@/assets/icons/yandex.svg";
import { Button } from "@/ui/Button/Button";
import UserSvg from "@/assets/icons/userPurple.svg";
import EventSvg from "@/assets/icons/event.svg";
import styles from "./page.module.scss";
import LanguageSvg from "@/assets/icons/language.svg";
import PrivateSvg from "@/assets/icons/private.svg";
import BustSvg from "@/assets/icons/bust.svg";
import List, { ListItem } from "@/app/profile/components/List/List";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { useRouter } from "next/navigation";
import Transition from "@/components/Transition/Transition";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  categoryMapper,
  UserMappingProfile,
  UserStoreContext,
} from "@/utils/context/UserStoreContext";
import { findProfiles } from "@/api/services/profile/find-by-user.api";
import { getCategories } from "@/api/services/category/category.api";
import { findMe } from "@/api/services/user/find_me/find_me.api";
import { UserAccount } from "@/api/services/user/find_me/find_me.types";
import { vibrate } from "@/utils/hooks/vibration.helper";
import { CategoryT } from "@/api/services/category/category.types";

export default function Profile() {
  const router = useRouter();
  const [allUsersProfilies, setUsersProfilies] = useState<UserMappingProfile[]>(
    [],
  );
  const [user, setUser] = useState<UserAccount | null>(null);
  const [categories, setCategories] = useState<CategoryT[]>([]);
  const { usersProfilies, handleSetUserProfilies } =
    useContext(UserStoreContext);

  useEffect(() => {
    vibrate();
    const a = async () => {
      try {
        const user = await findMe();
        setUser(user);
      } catch (e) {}
      try {
        const account = await findProfiles();
        if (account.length > 0) {
          const b = await getCategories();
          setCategories(b);
          handleSetUserProfilies(account, b);
        }
      } catch (e) {}
    };

    void a();
  }, []);

  useEffect(() => {
    setUsersProfilies(usersProfilies);
  }, [usersProfilies]);

  const items = useCallback(() => {
    let res = [];
    for (let key in categoryMapper) {
      const profile = allUsersProfilies.find((profile) => profile.name === key);
      if (profile) {
        res.push({
          text: `${profile.name} анкета`,
          icon: profile.icon,
          visible: profile.visible,
          onClick: () => router.push(`/profile/${profile.categoryId}`),
        });
      } else {
        const empty = categoryMapper[key];
        res.push({
          text: `${empty.desc} анкета`,
          icon: empty.icon,
          visible: "Close",
          onClick: () =>
            router.push(
              `/profile/new/${categories.find((c) => c.title === empty.desc)?.id}`,
            ),
        });
      }
    }
    return res as ListItem[];
  }, [allUsersProfilies, router, categories]);

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
          iconUserSrc={allUsersProfilies?.[0]?.info?.picture ?? ""}
          userNickname={user?.username}
          userName={user?.username}
        />
        <Button
          text="Редактировать профиль"
          onClick={() => router.push("/profile/edit")}
          variant="secondary"
          IconLeft={UserSvg}
          justify="start"
          className={styles.btn}
        />
        <List items={items()} />
        <Button
          text="Управление эвентами"
          onClick={() => router.push("/profile/events")}
          variant="secondary"
          IconLeft={EventSvg}
          justify="start"
          className={styles.btn}
        />
        <Button
          text="Буст анкеты"
          onClick={() => console.log("")}
          variant="secondary"
          IconLeft={BustSvg}
          justify="space-between"
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
