import styles from "./styles.module.scss";
import { ReactNode } from "react";
import PlusSvg from "@/assets/icons/add.svg";

interface HeaderProps {
  iconCompany: ReactNode;
  iconUserSrc: string;
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
        <div className={styles.user}>
          <PlusSvg key="plus" />
        </div>
      </div>
      <span className={styles.name}>{userName}</span>
      <span className={styles.nickname}>{userNickname}</span>
    </div>
  );
}
