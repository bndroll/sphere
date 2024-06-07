import styles from "./styles.module.scss";
import ArrowSvg from "@/assets/icons/arrowWhite.svg";
import Image from "next/image";
import { ReactNode, useCallback } from "react";
import BuisnessSvg from "@/assets/icons/buisness.svg";
import RomanticSvg from "@/assets/icons/heart.svg";
import HobbieSvg from "@/assets/icons/hobbieBlack.svg";
import cn from "classnames";
import { useRouter } from "next/navigation";

export interface Chip {
  text: string;
  icon: ReactNode;
}

interface EventItemProps {
  title: string;
  iconEvent: string;
  profileId?: string;
  chips: Chip[];
}

export default function EventItem({
  title,
  iconEvent,
  chips,
  profileId,
}: EventItemProps) {
  const router = useRouter();
  const getChip = (type: string) => {
    if (type === "Деловая")
      return (
        <div className={cn(styles.chip, styles.buisness)}>
          <BuisnessSvg />
          <span className={styles.label}>Деловой</span>
        </div>
      );
    if (type === "Романтическая")
      return (
        <div className={cn(styles.chip, styles.romantic)}>
          <RomanticSvg />
          <span className={styles.label}>Романтический</span>
        </div>
      );
    if (type === "Досуговая")
      return (
        <div className={cn(styles.chip, styles.hobbie)}>
          <HobbieSvg />
          <span className={styles.label}>Досуговый</span>
        </div>
      );
  };

  const handleNavigate = useCallback(() => {
    router.push(`/profile/events/${profileId}`);
  }, [router, profileId]);

  return (
    <div className={styles.container}>
      {iconEvent && (
        <Image
          src={`https://sphereapp.ru/api/account${iconEvent}`}
          alt={title}
          width={50}
          height={50}
          className={styles.img}
        />
      )}
      {!iconEvent && <div className={styles.empty}></div>}
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <div className={styles.chips}>
            {chips && chips.map((item) => getChip(item.text))}
          </div>
        </div>
        <button className={styles.btn} onClick={handleNavigate}>
          <ArrowSvg />
        </button>
      </div>
    </div>
  );
}
