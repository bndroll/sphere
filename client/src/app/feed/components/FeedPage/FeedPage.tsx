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

export const FeedPage = () => {
  const [tabs, setTabs] = useState(["Романтическая", "Деловая", "Досуговая"]);
  const [activeTab, setActiveTab] = useState(1);
  const [customStyles, setCustomStyles] = useState({});
  const [[page, direction], setPage] = useState([0, 0]);
  const [[card, directionCard], setCard] = useState([0, 0]);
  const { usersProfilies, user, handleSetUserProfilies } =
    useContext(UserStoreContext);
  const imageIndex = wrap(0, tabs.length, page);

  const [fFeeds, setFFeeds] = useState<ProfileCardType[]>([]);

  useEffect(() => {
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
      const feedsRequests = profilies.map((profile) =>
        getReccomendation(profile.id, profile.name, 10),
      );
      const feeds = await Promise.all(feedsRequests);
      setFFeeds(feeds.flat());
    };
    void a();
  }, [usersProfilies]);

  const imageIndex2 = wrap(0, tabs.length, card);

  const handleChangeTab = useCallback((tab: number) => {
    paginate(tab);
  }, []);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setActiveTab(wrap(0, tabs.length, page + newDirection) + 1);
  };

  const paginateVertical = (newDirection: number) => {
    setCard([card + newDirection, newDirection]);
  };

  const handleEndSwipe = (e: MouseEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
    setCustomStyles({ opacity: 1 });
  };

  const handleEndCertSwipe = () => {
    paginateVertical(1);
    setCustomStyles({ opacity: 1 });
  };

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
            className={styles.swiper_vert}
            variants={variants2}
            initial="visible"
            animate={{ y: `-${imageIndex2 * 100}%` }}
            transition={cardTransition}
          >
            {fFeeds.map((item) => (
              <>
                {tab === item.category.title && (
                  <div className={styles.content}>
                    <Info
                      key={item.id}
                      data={item}
                      handleLikeClick={handleEndCertSwipe}
                      stylesCustom={customStyles}
                    />
                  </div>
                )}
              </>
            ))}
          </motion.div>
        ))}
      </motion.div>
      <TabBar tabs={tabs} onMenuClick={handleChangeTab} />
    </div>
  );
};
