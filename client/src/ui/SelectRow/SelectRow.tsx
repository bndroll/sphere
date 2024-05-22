import styles from "./styles.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import ArrowSvg from "@/assets/icons/select-arrow.svg";
import { motion } from "framer-motion";
import { useScrollLock } from "@/utils/hooks/useScrollLock";
import { TextInput } from "@/ui/TextInput/TextInput";
import CheckSVG from "@/assets/icons/check.svg";

type Props = {
  placeholder?: string;
  label: string;
  options?: string[];
  multiSelect?: boolean;
  value?: string;
  onChange?: (val: string) => void;
};
export const SelectRow: FC<Props> = ({
  placeholder,
  label,
  options = [],
  value = "",
  multiSelect = false,
  onChange,
}) => {
  const [initValue, setValue] = useState(value);
  const [isSelectOpen, setOpenSelect] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [selfOptions, setSelfOptions] = useState(options);
  const ref = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { setScrollLock, removeScrollLock } = useScrollLock();
  const onClickAction = () => {
    setOpenSelect((prev) => !prev);
  };

  const handleSelect = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  const handleSearchValChange = (val: string | number) => {
    if (typeof val === "string") {
      setSearchField(val);
      const filtratedOptions = options.filter((o) => o.includes(val));
      setSelfOptions(filtratedOptions);
    }
  };

  useEffect(() => {
    isSelectOpen ? setScrollLock() : removeScrollLock();
  }, [isSelectOpen, removeScrollLock, setScrollLock]);

  return (
    <div>
      <motion.div className={styles.select} data-isopen={isSelectOpen}>
        <TextInput
          placeholder="поиск"
          value={searchField}
          wrapperClassName={styles.search}
          onChange={handleSearchValChange}
        />
        <div className={styles.list} onClick={onClickAction}>
          {selfOptions.map((o) => (
            <div
              className={styles.option}
              key={o}
              onClick={() => handleSelect(o)}
            >
              <div>
                <span>{o}</span>
              </div>

              {!multiSelect && initValue === o && (
                <span className={styles.flag}>
                  <CheckSVG />
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
      <div className={styles.wrapper} onClick={onClickAction}>
        <label>
          <p>{label}</p>
        </label>
        <span className={styles.value_wrapper}>
          <span>{initValue}</span>
          <ArrowSvg />
        </span>
      </div>
    </div>
  );
};
