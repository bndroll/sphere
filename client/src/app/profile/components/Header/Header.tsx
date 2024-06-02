import styles from "./styles.module.scss";
import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import PlusSvg from "@/assets/icons/add.svg";

interface HeaderProps {
  iconCompany: ReactNode;
  iconUserSrc: StaticImageData;
  userName: string;
  userNickname: string;
}

export default function Header({
  iconCompany,
  iconUserSrc,
  userName,
  userNickname,
}: HeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.photos}>
        <div className={styles.company}>{iconCompany}</div>
        <div className={styles.user}>
          <Image src={iconUserSrc} alt={userName} className={styles.userImg} />
        </div>
        <button className={styles.btn}>
          <PlusSvg key="plus" />
        </button>
      </div>
      <span className={styles.name}>{userName}</span>
      <span className={styles.nickname}>{userNickname}</span>
    </div>
  );
}
