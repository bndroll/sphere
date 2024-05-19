import styles from "./styles.module.scss";
import { FC, useState } from "react";
import { SwitchCheckBox } from "@/ui/SwitchCheckBox/SwitchCheckBox";
import cn from "classnames";

type Props = {
  placeholder?: string;
  label: string;
  className?: string;
};
export const SwitchRow: FC<Props> = ({ placeholder, label, className }) => {
  const [value, setValue] = useState("");

  return (
    <div className={cn(className, styles.wrapper)}>
      <label>
        <p>{label}</p>
      </label>
      <SwitchCheckBox />
    </div>
  );
};
