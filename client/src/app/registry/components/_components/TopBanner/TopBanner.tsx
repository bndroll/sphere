import styles from "./styles.module.scss";
import React, { FC } from "react";
import cn from "classnames";
import BgPng from "@/assets/images/banner_bg.png";
import Image from "next/image";

type Props = {
  title: string;
  label?: string;
  titleClassname?: string;
};
export const TopBanner: FC<Props> = ({ title, label, titleClassname }) => {
  return (
    <div className={styles.main}>
      <aside className={styles.rolers}>
        <Image src={BgPng} alt="" />
      </aside>
      <span className={styles.label}>{label}</span>
      <h3 className={cn(titleClassname, styles.title)}>{title}</h3>
    </div>
  );
};
