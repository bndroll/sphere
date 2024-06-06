import styles from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import ArrowSvg from "@/assets/icons/select-arrow.svg";
import { motion } from "framer-motion";
import { useScrollLock } from "@/utils/hooks/useScrollLock";
import { TextInput } from "@/ui/TextInput/TextInput";
import CheckSVG from "@/assets/icons/check.svg";
import cn from "classnames";
import { Button } from "@/ui/Button/Button";

type Props = {
  placeholder?: string;
  label: string;
  options?: string[];
  multiSelect?: boolean;
  value?: string | string[];
  onChange?: (val: string) => void;
  onMultiChange?: (val: string[]) => void;
};
export const SelectRow: FC<Props> = ({
  placeholder,
  label,
  options = [],
  value = "",
  multiSelect = false,
  onChange,
  onMultiChange,
}) => {
  const [initValue, setValue] = useState(value);
  const [isSelectOpen, setOpenSelect] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [selfOptions, setSelfOptions] = useState(options);
  const { setScrollLock, removeScrollLock } = useScrollLock();

  const [savedValue, setSavedValue] = useState(value);
  const onClickAction = () => {
    setOpenSelect((prev) => !prev);
  };

  useEffect(() => {
    setSelfOptions(options);
  }, [options]);

  useEffect(() => {
    setValue(value);
    setSavedValue(value);
  }, [value]);

  const handleSelect = (val: string) => {
    setValue(val);
    setOpenSelect(false);
    onChange?.(val);
  };

  const handleSave = () => {
    setValue(savedValue);
    onMultiChange?.(Array.from(savedValue));
    setOpenSelect(false);
  };

  const handleCancel = () => {
    setValue(initValue);
    setSavedValue(initValue);
    setOpenSelect(false);
  };

  const handleSearchValChange = (val: string | number) => {
    if (typeof val === "string") {
      setSearchField(val);
      const filtratedOptions = options.filter((o) => o.includes(val));
      setSelfOptions(filtratedOptions);
    }
  };

  const handleMultiSelect = (val: string) => {
    if (Array.isArray(initValue)) {
      setSavedValue((prevState) => {
        if (Array.isArray(prevState)) {
          const index = prevState.indexOf(val);
          let arr: string[] = [];
          if (index > -1) {
            arr = [
              ...prevState.slice(0, index),
              ...prevState.slice(index + 1, prevState.length),
            ];
            return arr;
          }
        }
        return [...Array.from(prevState), val];
      });
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
        <div
          className={cn(styles.list, {
            [styles.multi_list]: Array.isArray(initValue),
          })}
        >
          {selfOptions.map((o) => (
            <>
              {!Array.isArray(initValue) && (
                <div
                  className={styles.option}
                  key={o}
                  onClick={() => handleSelect(o)}
                >
                  <div>
                    <span>{o}</span>
                  </div>

                  {initValue === o && (
                    <span className={styles.flag}>
                      <CheckSVG />
                    </span>
                  )}
                </div>
              )}
              {Array.isArray(savedValue) && (
                <div
                  className={styles.multi_option}
                  key={o}
                  onClick={() => handleMultiSelect(o)}
                >
                  <span className={styles.flag}>
                    <span
                      className={cn(styles.check, {
                        [styles.active]: savedValue.includes(o),
                      })}
                    >
                      {savedValue.includes(o) && <CheckSVG />}
                    </span>
                  </span>
                  <div>
                    <span>{o}</span>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        {Array.isArray(savedValue) && (
          <div className={styles.action}>
            <Button text="Применить" onClick={handleSave} />
            <Button text="Отмена" variant="secondary" onClick={handleCancel} />
          </div>
        )}
      </motion.div>
      <div className={styles.wrapper} onClick={onClickAction}>
        <label>
          <p>{label}</p>
        </label>
        <span className={styles.value_wrapper}>
          {Array.isArray(initValue) && (
            <span className={styles.val}>
              {initValue[0]}
              {initValue.length > 1 ? `, +${initValue.length - 1}` : ""}
            </span>
          )}
          {!Array.isArray(initValue) && (
            <span className={styles.val}>{initValue}</span>
          )}
          <ArrowSvg />
        </span>
      </div>
    </div>
  );
};
