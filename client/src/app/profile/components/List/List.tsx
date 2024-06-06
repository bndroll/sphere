import { ReactNode } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

export interface ListItem {
  icon: ReactNode;
  text: string;
  visible?: "Open" | "Close";
  specialIcon?: ReactNode;
  specialText?: string;
  onClick?: () => void;
}

interface ListProps {
  items: ListItem[];
}

export default function List({ items }: ListProps) {
  return items.length > 0 ? (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li
          className={cn(styles.item, {
            [styles.disabled]: item.visible == "Close",
          })}
          key={item.text}
          onClick={item.onClick}
        >
          {item.icon}
          <span
            className={cn(styles.text, {
              [styles.borderNone]: index === items.length - 1,
            })}
          >
            {item.text}
            {item.specialIcon && (
              <div className={styles.special}>
                <span className={styles.specialText}>{item.specialText}</span>
                {item.specialIcon}
              </div>
            )}
            {item.visible === "Close" && (
              <span className={styles.secondary}>не активно</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  ) : (
    <></>
  );
}
