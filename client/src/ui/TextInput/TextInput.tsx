import styles from "./styles.module.scss";
import { FC, FormEvent, useCallback, useRef, useState } from "react";
import ClearSVG from "@/assets/icons/clear.svg";

type Props = {
  placeholder?: string;
};
export const TextInput: FC<Props> = ({ placeholder }) => {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setValue(val);
  }, []);

  const handleKeyDown = useCallback((event: any) => {
    if (event.key === "Enter") {
      ref.current?.blur();
    }
  }, []);

  const onClickClose = useCallback(() => {
    setValue("");
    ref.current?.focus();
  }, [ref]);

  return (
    <div className={styles.wrapper}>
      <input
        ref={ref}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onInput={onInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {value && isFocused && (
        <span className={styles.closeTag} onClick={onClickClose}>
          <ClearSVG />
        </span>
      )}
    </div>
  );
};
