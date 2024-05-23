import styles from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { SwitchCheckBox } from "@/ui/SwitchCheckBox/SwitchCheckBox";
import cn from "classnames";

type Props = {
  placeholder?: string;
  label: string;
  value?: boolean;
  className?: string;
  onChange?: (val: boolean) => void;
};
export const SwitchRow: FC<Props> = ({ label, className, value, onChange }) => {
  const [initValue, setValue] = useState(false);

  const handleChange = (val: boolean) => {
    setValue(val);
    onChange?.(val);
  };

  useEffect(() => {
    setValue(value ?? false);
  }, [value]);

  return (
    <div className={cn(className, styles.wrapper)}>
      <label>
        <p>{label}</p>
      </label>
      <SwitchCheckBox value={initValue} onChange={handleChange} />
    </div>
  );
};
