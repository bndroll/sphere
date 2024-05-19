import styles from "./styles.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import ArrowSvg from "@/assets/icons/select-arrow.svg";
import { motion } from "framer-motion";
import { useScrollLock } from "@/utils/hooks/useScrollLock";

type Props = {
  placeholder?: string;
  label: string;
};
export const SelectRow: FC<Props> = ({ placeholder, label }) => {
  const [value, setValue] = useState("Саратов");
  const [isSelectOpen, setOpenSelect] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { setScrollLock, removeScrollLock } = useScrollLock();
  const onClickAction = () => {
    setOpenSelect((prev) => !prev);
  };

  useEffect(() => {
    isSelectOpen ? setScrollLock() : removeScrollLock();
  }, [isSelectOpen, removeScrollLock, setScrollLock]);

  return (
    <div>
      <motion.div
        className={styles.select}
        data-isopen={isSelectOpen}
        onClick={onClickAction}
      ></motion.div>
      <div className={styles.wrapper} onClick={onClickAction}>
        <label>
          <p>{label}</p>
        </label>
        <span className={styles.value_wrapper}>
          <span>{value}</span>
          <ArrowSvg />
        </span>
      </div>
    </div>
  );
};
