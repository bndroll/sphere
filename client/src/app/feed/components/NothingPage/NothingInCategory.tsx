import styles from "./styles.module.scss";
import { FC } from "react";
import Lottie from "react-lottie";
import animationData from "@/assets/lotti/no_user.json";

type Props = {
  type?: string;
};
export const NothingInCategory: FC<Props> = ({ type }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };
  return (
    <div className={styles.container}>
      <Lottie options={defaultOptions} height={200} width={200} />
      <span className={styles.info}>Для данной категории нет рекомендаций</span>
    </div>
  );
};
