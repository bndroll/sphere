"use client";
import Image from "next/image";
import business from "@/assets/images/business.png";
import styles from "./styles.module.scss";
import { Button } from "@/ui/Button/Button";
import ArrowSvg from "@/assets/icons/Arrow.svg";
import Chip from "@/app/feed/components/Chip/Chip";
import HeartSvg from "@/assets/icons/heart.svg";
import HeartSlashSvg from "@/assets/icons/heart-slash.svg";
import { CSSProperties, FC, useRef, useState } from "react";

interface Props {
  stylesCustom?: CSSProperties;
  handleLikeClick: () => void;
}

export const Info: FC<Props> = ({ stylesCustom, handleLikeClick }) => {
  const chipRef = useRef<HTMLDivElement>(null);
  const chipItems = [
    "Партнёрство",
    "Коллаборации",
    "Запуски",
    "Коллаборации",
    "Запуски",
  ];

  const tabs = ["Романтическая", "Деловая", "Досуговая"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className={styles.container}>
      <Image
        src={business}
        alt="Photo"
        className={styles.img}
        draggable={false}
      />
      <div className={styles.info} style={stylesCustom}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Валентина, 34</h2>
          <Button
            IconRight={ArrowSvg}
            variant="default"
            text={"Подробнее"}
            onClick={() => console.log("next")}
          />
        </div>
        <div className={styles.chips} ref={chipRef}>
          {chipItems.map((item, i) => {
            if (i < 2) {
              return <Chip text={item} key={item} />;
            }
            return <></>;
          })}
          {chipItems.length > 2 && <Chip text={`+${chipItems.length - 2}`} />}
        </div>
        <span className={styles.text}>
          Я являюсь финансовым директором в сфере fin-tech, обладающим высокой
          квалификацией и опытом работы в финансовой сфере.
        </span>
        <div className={styles.btnContainer}>
          <Button
            variant="primary"
            justify="center"
            text="Нравится"
            className={styles.btn}
            IconLeft={() => <HeartSvg className={styles.iconBtn}/>}
            onClick={handleLikeClick}
          />
          <Button
            variant="secondary"
            justify="center"
            text="Не интересно"
            className={styles.btn}
            IconLeft={() => <HeartSlashSvg className={styles.iconBtn} />}
            onClick={handleLikeClick}
          />
        </div>
      </div>
    </div>
  );
};
