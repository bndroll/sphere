import styles from "./styles.module.scss";
import { FC, FormEvent, useCallback, useEffect, useState } from "react";

type Props = {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (val: string) => void;
};
export const TextArea: FC<Props> = ({
  placeholder,
  rows = 5,
  value = "",
  onChange,
}) => {
  const [selfValue, setValue] = useState(value);

  const onInput = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
    const val = event.currentTarget.value;
    setValue(val);
    onChange?.(val);
  }, []);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <textarea
      maxLength={200}
      cols={30}
      rows={3}
      className={styles.textarea}
      placeholder={placeholder}
      value={selfValue}
      onChange={onInput}
    />
  );
};
