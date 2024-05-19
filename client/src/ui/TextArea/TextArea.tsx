import styles from "./styles.module.scss";
import { FC, FormEvent, useCallback, useState } from "react";

type Props = {
  placeholder?: string;
  rows?: number;
};
export const TextArea: FC<Props> = ({ placeholder, rows = 5 }) => {
  const [value, setValue] = useState("");

  const onInput = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
    const val = event.currentTarget.value;
    setValue(val);
  }, []);

  return (
    <textarea
      wrap="hard"
      maxLength={100}
      cols={30}
      rows={5}
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      onChange={onInput}
    />
  );
};
