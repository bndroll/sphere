import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

type Props = {
  variant?: "primary" | "secondary";
  text: string;
  IconLeft?: () => ReactNode;
  IconRight?: () => ReactNode;
  justify?: "center" | "space-between";
  onClick: () => void;
  disabled?: boolean;
};
export const Button: FC<Props> = ({
  variant = "primary",
  justify = "center",
  text,
  IconLeft,
  IconRight,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={cn(styles.button, styles[variant])}
      style={{ justifyContent: "space-between" }}
      onClick={onClick}
    >
      {!!IconLeft && <IconLeft />}
      {text}
      {!!IconRight && <IconRight />}
    </button>
  );
};
