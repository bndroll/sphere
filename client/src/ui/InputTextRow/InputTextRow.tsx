import styles from "./styles.module.scss";
import { FC, FormEvent, useCallback, useRef, useState } from "react";

type Props = {
  placeholder?: string;
  label: string;
};
export const InputTextRow: FC<Props> = ({ placeholder, label }) => {
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
      <p className={styles.label}>{label}</p>
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
    </div>
  );
};
