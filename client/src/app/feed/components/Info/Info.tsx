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
import { SwipeType } from "@/api/services/swipe/swipe.api";
import Chat from "@/assets/icons/message-text.svg";

interface Props {
  stylesCustom?: CSSProperties;
  handleLikeClick: (type: SwipeType, recProfileId: string) => void;
  data: ProfileCardType;
  isFromEvents?: boolean;
}

export const Info: FC<Props> = ({
  stylesCustom,
  handleLikeClick,
  data,
  isFromEvents = false,
}) => {
  const chipRef = useRef<HTMLDivElement>(null);
  const tabs = ["Романтическая", "Деловая", "Досуговая"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const handleClick = (type: SwipeType) => {
    handleLikeClick(type, data.id);
  };

  return (
    <div className={styles.container}>
      {data.info.picture?.length && (
        <Image
          src={`https://sphereapp.ru/api/account${data.info.picture}`}
          alt="Photo"
          width={720}
          height={480}
          quality={100}
          loading="lazy"
          className={styles.img}
          draggable={false}
        />
      )}
      <div className={styles.info}>
        {isFromEvents && <span className={styles.liked}>Вас лайкнули</span>}
        <div className={styles.titleContainer}>
          {data.info.avatarPicture && (
            <Image
              src={`https://sphereapp.ru/api/account${data.info.avatarPicture}`}
              alt="logo"
              quality={100}
              width={40}
              height={40}
              className={styles.icon}
            />
          )}
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
            text={isFromEvents ? "Перейти в чат" : "Нравится"}
            className={styles.btn}
            IconLeft={() =>
              isFromEvents ? (
                <Chat className={styles.iconBtn} />
              ) : (
                <HeartSvg className={styles.iconBtn} />
              )
            }
            onClick={() => handleClick(SwipeType.Like)}
          />
          <Button
            variant="secondary"
            justify="center"
            text="Не интересно"
            className={styles.btn}
            IconLeft={() => <HeartSlashSvg className={styles.iconBtn} />}
            onClick={() => handleClick(SwipeType.Dislike)}
          />
        </div>
      </div>
      <div className={styles.detail}></div>
    </div>
  );
};
