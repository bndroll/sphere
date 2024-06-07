"use client";
import styles from "@/app/feed/page.module.scss";
import { motion, wrap } from "framer-motion";
import { cardTransition, variants2 } from "@/app/feed/slide.animation";
import { NothingInCategory } from "@/app/feed/components/NothingPage/NothingInCategory";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { useCallback, useEffect, useState } from "react";
import { swipeProfile, SwipeType } from "@/api/services/swipe/swipe.api";
import { vibrate } from "@/utils/hooks/vibration.helper";
import { reccomendationEvents } from "@/api/services/recommendation_events/reccom_events.api";
import { getCategories } from "@/api/services/category/category.api";
import { findProfiles } from "@/api/services/profile/find-by-user.api";
import {
  categoryMapper,
  UserMappingProfile,
} from "@/utils/context/UserStoreContext";
import { Info } from "@/app/feed/components/Info/Info";
import { ProfileCardType } from "@/api/services/reccomendation/recomendation.types";

export const EventsFeed = () => {
  const [[card, directionCard], setCard] = useState([0, 0]);
  const imageIndex2 = wrap(0, 3, card);
  const [fFeeds, setFfeeds] = useState<ProfileCardType[]>([]);
  const [customStyles, setCustomStyles] = useState({});
  const [profil, setProfil] = useState<UserMappingProfile[]>([]);

  const paginateVertical = (newDirection: number) => {
    vibrate();
    setCard([card + newDirection - 1, newDirection]);
  };
  const isHasSomeProfilies = true;
  const handleEndCertSwipe = () => {
    paginateVertical(1);
    setCustomStyles(cardTransition);
  };
  const handleGiveReaction = useCallback(
    (profileId: string) => async (type: SwipeType, recProfileId: string) => {
      handleEndCertSwipe();
      const profile = profil.find((pr) => pr.categoryId == profileId);
      await swipeProfile(profile!.id, type, recProfileId);
      setFfeeds((prevState) => [
        ...prevState.filter((p) => p.id !== recProfileId),
      ]);
    },
    [handleEndCertSwipe],
  );

  useEffect(() => {
    const a = async () => {
      const cats = await getCategories();
      const account = await findProfiles();
      let profilies: UserMappingProfile[] = [];
      cats.forEach((category) => {
        account.map((profile) => {
          if (profile.categoryId === category.id && profile.type === "User") {
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

      setProfil(profilies);
      const feedsRequests = profilies.map(
        async (profile) => await reccomendationEvents(profile.id),
      );
      const feeds = await Promise.all(feedsRequests);
      setFfeeds(feeds.flat());
      console.log(feeds.flat());
    };
    void a();
  }, []);

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.swiper_vert}
        variants={variants2}
        initial="visible"
        animate={{ y: `-${imageIndex2 * 100}%` }}
        transition={cardTransition}
      >
        {fFeeds.length > 0 ? (
          fFeeds.map((item) => (
            <>
              <div className={styles.content} key={item.id}>
                <Info
                  key={item.id}
                  data={item}
                  handleLikeClick={handleGiveReaction(item.category.id)}
                  stylesCustom={customStyles}
                  isFromEvents={true}
                />
              </div>
            </>
          ))
        ) : (
          <NothingInCategory />
        )}
      </motion.div>
      <TabBar tabs={[]} />
    </div>
  );
};
