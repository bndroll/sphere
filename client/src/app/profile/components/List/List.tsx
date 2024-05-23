import { ReactNode } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

export interface ListItem {
  icon: ReactNode;
  text: string;
  specialIcon?: ReactNode;
  specialText?: string;
  onClick?: () => void;
}

interface ListProps {
  items: ListItem[];
}

export default function List({ items }: ListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li className={styles.item} key={item.text} onClick={item.onClick}>
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
          </span>
        </li>
      ))}
    </ul>
  );
}
