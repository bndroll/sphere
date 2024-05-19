import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./styles.module.scss";

export const SwitchCheckBox = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  const spring = {
    type: "spring",
    stiffness: 1000,
    damping: 50,
  };

  return (
    <div className={styles.switch} data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div className={styles.handle} layout transition={spring} />
    </div>
  );
};
