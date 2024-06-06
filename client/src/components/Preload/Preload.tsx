import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import ReviewLogoSVG from "@/assets/icons/preview_logo.svg";

export const Preload = () => {
  return (
    <motion.div className={styles.main}>
      <div className={styles.anim_wrapper}>
        <ReviewLogoSVG />
        <p className={styles.text}>исследуй этот мир</p>
        <div className={styles.circle}>
          <svg className={styles.spinner} viewBox="0 0 50 50">
            <circle
              className={styles.path}
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="3"
            ></circle>
          </svg>
          <div className={styles.remove}></div>
        </div>
      </div>
    </motion.div>
  );
};
