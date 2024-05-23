import styles from "./styles.module.scss";
import { FC, FormEvent, useCallback, useEffect, useRef, useState } from "react";

type Props = {
  placeholder?: string;
  label: string;
  value?: string;
  onChange?: (val: string) => void;
  type?: "text" | "number" | "password";
};
export const InputTextRow: FC<Props> = ({
  placeholder,
  label,
  value = "",
  onChange,
  type,
}) => {
  const [selfValue, setValue] = useState(value);
  const ref = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const onInput = useCallback((event: FormEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setValue(val);
    onChange?.(val);
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
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={selfValue}
        onInput={onInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
