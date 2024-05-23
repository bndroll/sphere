"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "@/ui/Button/Button";
import ArrowSvg from "@/assets/icons/Arrow.svg";
import Chip from "@/app/feed/components/Chip/Chip";
import HeartSvg from "@/assets/icons/heart.svg";
import HeartSlashSvg from "@/assets/icons/heart-slash.svg";
import { CSSProperties, FC, useRef, useState } from "react";
import { ProfileCardType } from "@/api/services/reccomendation/recomendation.types";

interface Props {
  stylesCustom?: CSSProperties;
  handleLikeClick: () => void;
  data: ProfileCardType;
}

export const Info: FC<Props> = ({ stylesCustom, handleLikeClick, data }) => {
  const chipRef = useRef<HTMLDivElement>(null);

  const tabs = ["Романтическая", "Деловая", "Досуговая"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div className={styles.container}>
      {data.info.picture?.length && (
        <Image
          src={`https://sphereapp.ru/api/account${data.info.picture}`}
          alt="Photo"
          width={100}
          height={100}
          className={styles.img}
          draggable={false}
        />
      )}
      <div className={styles.info} style={stylesCustom}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{data.info.name}</h2>
          <Button
            IconRight={ArrowSvg}
            variant="default"
            text="Подробнее"
            onClick={() => console.log("next")}
          />
        </div>
        <div className={styles.chips} ref={chipRef}>
          {data.tags.map((item, i) => {
            if (i < 2) {
              return <Chip text={item.title} key={item.title} />;
            }
            return <></>;
          })}
          {data.tags.length > 2 && <Chip text={`+${data.tags.length - 2}`} />}
        </div>
        <span className={styles.text}>{data.info.about}</span>
        <div className={styles.btnContainer}>
          <Button
            variant="primary"
            justify="center"
            text="Нравится"
            className={styles.btn}
            IconLeft={() => <HeartSvg className={styles.iconBtn} />}
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
