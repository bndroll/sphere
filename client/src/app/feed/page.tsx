"use client";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { Info } from "@/app/feed/components/Info/Info";
import styles from "./page.module.scss";
import { NavBar } from "@/app/feed/components/NavBar/NavBar";
import { useCallback, useState } from "react";
import { motion, PanInfo, wrap } from "framer-motion";
import {
  cardTransition,
  slideTransition,
  swipeConfidenceThreshold,
  swipePower,
  variants,
  variants2,
} from "@/app/feed/slide.animation";

export default function Questionnaire() {
  const [tabs, setTabs] = useState(["Романтическая", "Деловая", "Досуговая"]);
  const [activeTab, setActiveTab] = useState(1);
  const [customStyles, setCustomStyles] = useState({});
  const [[page, direction], setPage] = useState([0, 0]);
  const [[card, directionCard], setCard] = useState([0, 0]);

  const imageIndex = wrap(0, tabs.length, page);

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
        {tabs.map((item) => (
          <motion.div
            className={styles.swiper_vert}
            variants={variants2}
            initial="visible"
            animate={{ y: `-${imageIndex2 * 100}%` }}
            transition={cardTransition}
          >
            {[1, 2, 3].map(() => (
              <div className={styles.content}>
                <Info key={item} handleLikeClick={handleEndCertSwipe} stylesCustom={customStyles}/>
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
      <TabBar tabs={tabs} onMenuClick={handleChangeTab}/>
    </div>
  );
}
