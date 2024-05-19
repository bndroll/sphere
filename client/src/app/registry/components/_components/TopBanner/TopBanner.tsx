import styles from "./styles.module.scss";
import { FC } from "react";
import cn from "classnames";

type Props = {
  title: string;
  label?: string;
  titleClassname?: string;
};
export const TopBanner: FC<Props> = ({ title, label, titleClassname }) => {
  return (
    <div className={styles.main}>
      <span className={styles.label}>{label}</span>
      <h3 className={cn(titleClassname, styles.title)}>{title}</h3>
    </div>
  );
};
