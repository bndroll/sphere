"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { motion, PanInfo, wrap } from "framer-motion";
import {
  cardTransition,
  slideTransition,
  swipeConfidenceThreshold,
  swipePower,
  variants,
  variants2,
} from "@/app/feed/slide.animation";
import styles from "@/app/feed/page.module.scss";
import { NavBar } from "@/app/feed/components/NavBar/NavBar";
import { Info } from "@/app/feed/components/Info/Info";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { getReccomendation } from "@/api/services/reccomendation/recomendation.api";
import {
  categoryMapper,
  UserMappingProfile,
  UserStoreContext,
} from "@/utils/context/UserStoreContext";
import { getCategories } from "@/api/services/category/category.api";
import { findProfiles } from "@/api/services/profile/find-by-user.api";
import { ProfileCardType } from "@/api/services/reccomendation/recomendation.types";
import { NothingInCategory } from "@/app/feed/components/NothingPage/NothingInCategory";
import { SwipeType, swipeProfile } from "@/api/services/swipe/swipe.api";
import { vibrate } from "@/utils/hooks/vibration.helper";
export const FeedPage = () => {
  const [tabs, setTabs] = useState<string[]>([
    "Романтическая",
    "Деловая",
    "Досуговая",
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [customStyles, setCustomStyles] = useState({});
  const [[page, direction], setPage] = useState([0, 0]);
  const [[card, directionCard], setCard] = useState([0, 0]);
  const { usersProfilies, user, handleSetUserProfilies } =
    useContext(UserStoreContext);
  const [profil, setProfil] = useState<UserMappingProfile[]>([]);
  const imageIndex = wrap(0, tabs.length, page);

  const [fFeeds, setFFeeds] = useState<ProfileCardType[]>([]);

  useEffect(() => {
    vibrate();
    const a = async () => {
      const cats = await getCategories();
      const account = await findProfiles();
      let profilies: UserMappingProfile[] = [];
      cats.forEach((category) => {
        account.map((profile) => {
          if (profile.categoryId === category.id) {
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
        async (profile) =>
          await getReccomendation(profile.id, profile.name, 10),
      );
      const feeds = await Promise.all(feedsRequests);
      setFFeeds(feeds.flat());
    };
    void a();
  }, [usersProfilies]);

  const imageIndex2 = wrap(0, tabs.length, card);

  const handleChangeTab = useCallback((tab: number) => {
    paginate(tab, true);
  }, []);

  const paginate = (newDirection: number, reset = false) => {
    vibrate();
    setPage([page + newDirection, newDirection]);
    setCard([0, 0]);
    setActiveTab(wrap(0, tabs.length, page + newDirection) + 1);
  };

  const paginateVertical = (newDirection: number) => {
    vibrate();
    setCard([card + newDirection - 1, newDirection]);
  };

  const handleEndSwipe = (e: MouseEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if ("vibrate" in navigator) return navigator.vibrate(100);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
    setCustomStyles({ opacity: 1 });
  };

  const handleEndCertSwipe = () => {
    paginateVertical(1);
    setCustomStyles(cardTransition);
  };

  const handleGiveReaction = useCallback(
    (profileId: string) => async (type: SwipeType, recProfileId: string) => {
      const profile = profil.find((pr) => pr.categoryId == profileId);
      if (profile) {
        await swipeProfile(profile.id, type, recProfileId);
        handleEndCertSwipe();
        setFFeeds((prevState) => [
          ...prevState.filter((p) => p.id !== recProfileId),
        ]);
      }
    },
    [profil, handleEndCertSwipe],
  );

  const isHasSomeProfilies = useCallback(
    (type: string) => {
      return fFeeds.some((f) => f.category.title == type);
    },
    [fFeeds],
  );

  return (
    <div className={styles.container}>
      <NavBar tabs={tabs} current={activeTab} onChange={handleChangeTab} />
      <motion.div
        className={styles.swiper}
        variants={variants}
        initial="visible"
        animate={{ x: `-${imageIndex * 100}%` }}
        transition={slideTransition}
        drag="x"
        onDragStart={() => setCustomStyles({ opacity: 0.5 })}
        onDragEnd={handleEndSwipe}
      >
        {tabs.map((tab) => (
          <motion.div
            key={tab}
            className={styles.swiper_vert}
            variants={variants2}
            initial="visible"
            animate={{ y: `-${imageIndex2 * 100}%` }}
            transition={cardTransition}
          >
            {isHasSomeProfilies(tab) ? (
              fFeeds.map((item) => (
                <>
                  {tab === item.category.title && (
                    <div className={styles.content} key={item.id}>
                      <Info
                        key={item.id}
                        data={item}
                        handleLikeClick={handleGiveReaction(item.category.id)}
                        stylesCustom={customStyles}
                      />
                    </div>
                  )}
                </>
              ))
            ) : (
              <NothingInCategory />
            )}
          </motion.div>
        ))}
      </motion.div>
      <TabBar tabs={tabs} onMenuClick={handleChangeTab} />
    </div>
  );
};
