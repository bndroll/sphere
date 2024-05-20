import { motion } from "framer-motion";
import { FC, useState } from "react";
import styles from "./styles.module.scss";

type Props = {
  value?: boolean;
  onChange?: (val: boolean) => void;
};
export const SwitchCheckBox: FC<Props> = ({ value = false, onChange }) => {
  const [isOn, setIsOn] = useState(value);

  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState);
    onChange?.(!isOn);
  };

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
