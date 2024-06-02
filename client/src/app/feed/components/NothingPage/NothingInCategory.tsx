import styles from "./styles.module.scss";
import { FC } from "react";

type Props = {
  type?: string;
};
export const NothingInCategory: FC<Props> = ({ type }) => {
  return (
    <div className={styles.container}>
      <span className={styles.info}>Для данной категории нет рекомендаций</span>
    </div>
  );
};
