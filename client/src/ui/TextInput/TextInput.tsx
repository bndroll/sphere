import styles from "./styles.module.scss";
import { FC, FormEvent, useCallback, useRef, useState } from "react";
import ClearSVG from "@/assets/icons/clear.svg";

type Props = {
  placeholder?: string;
  value?: string | number;
  onChange?: (val: string | number) => void;
};
export const TextInput: FC<Props> = ({ placeholder, value = "", onChange }) => {
  const [inputValue, setValue] = useState(value);
  const ref = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setTimeout(() => setIsFocused(true));
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false));
  };

  const onInput = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const val = event.currentTarget.value;
      setValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  const handleKeyDown = useCallback((event: any) => {
    if (event.key === "Enter") {
      ref.current?.blur();
    }
  }, []);

  const onClickClose = () => {
    setValue("");
    onChange?.("");
    ref.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={ref}
        className={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onInput={onInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      {inputValue && isFocused && (
        <span className={styles.closeTag} onClick={onClickClose}>
          <ClearSVG />
        </span>
      )}
    </div>
  );
};
