"use client";

import styles from "./page.module.scss";
import EventItem, {
  Chip,
} from "@/app/profile/events/components/EventItem/EventItem";
import PlusSvg from "@/assets/icons/add.svg";
import { Button } from "@/ui/Button/Button";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import ProfileBg from "@/assets/images/profile_bg.png";
import Transition from "@/components/Transition/Transition";
import { useEffect, useState } from "react";
import { findProfiles } from "@/api/services/profile/find-by-user.api";
import { getCategories } from "@/api/services/category/category.api";
import { CategoryT } from "@/api/services/category/category.types";
import {
  categoryMapper,
  UserMappingProfile,
} from "@/utils/context/UserStoreContext";

interface EventItem {
  title: string;
  iconEvent: StaticImageData;
  chips: Chip[];
}

export default function Events() {
  const router = useRouter();
  const [event, setEvents] = useState<UserMappingProfile[]>([]);
  const [categories, setCategories] = useState<CategoryT[]>([]);

  useEffect(() => {
    const a = async () => {
      const account = await findProfiles();
      const categories = await getCategories();
      setCategories(categories);
      let profilies: UserMappingProfile[] = [];
      account.map((profile) => {
        categories.forEach((category) => {
          if (profile.categoryId === category.id && profile.type === "Event") {
            // @ts-ignore
            profilies.push({
              ...profile,
              // @ts-ignore
              code: categoryMapper[category.title].type,
              // @ts-ignore
              name: categoryMapper[category.title].desc,
              // @ts-ignore
              icon: categoryMapper[category.title].icon,
            } as UserMappingProfile);
          }
        });
      });

      setEvents(profilies);
    };

    void a();
  }, []);

  return (
    <Transition>
      <div className={styles.container}>
        <Image
          src={ProfileBg}
          quality={100}
          width={430}
          height={170}
          className={styles.bg}
          alt=""
        />
        <h2 className={styles.title}>Мои эвенты</h2>
        <div className={styles.content}>
          <div className={styles.events}>
            {event.map((item) => (
              <div key={item.id}>
                <EventItem
                  key={item.info.about}
                  title={item.info.about ?? ""}
                  iconEvent={item.info.picture ?? ""}
                  profileId={item.id}
                  chips={[{ text: item.name, icon: item.icon }]}
                />
              </div>
            ))}
          </div>
          <Button
            text="Создать эвент"
            onClick={() => router.push("/profile/events/createEvent")}
            IconLeft={() => <PlusSvg />}
            justify="center"
            variant="primary"
          />
        </div>
        <TabBar tabs={[]} className={styles.tabBar} />
      </div>
    </Transition>
  );
}
