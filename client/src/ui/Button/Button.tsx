import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

type Props = {
  variant?: "primary" | "secondary" | "default";
  text: string;
  IconLeft?: () => ReactNode;
  IconRight?: () => ReactNode;
  justify?: "center" | "space-between" | "start";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};
export const Button: FC<Props> = ({
  variant = "primary",
  justify = "center",
  className,
  text,
  IconLeft,
  IconRight,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={cn(className, styles.button, styles[variant], {
        [styles.disabled]: disabled,
      })}
      style={{ justifyContent: justify }}
      onClick={!disabled ? onClick : () => {}}
      disabled={disabled}
    >
      <div className={styles.content}>
        {!!IconLeft && <IconLeft />}
        {text}
      </div>
      {!!IconRight && <IconRight />}
    </button>
  );
};
