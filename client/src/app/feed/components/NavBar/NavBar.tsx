import styles from "./styles.module.scss";
import { FC, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import cn from "classnames";

type Props = {
  tabs: any[];
  current: number;
  onChange: (tab: number) => void;
};

export const NavBar: FC<Props> = ({ tabs, current, onChange }) => {
  const [selectedTab, setSelectedTab] = useState(current);

  const handleChangeTab = useCallback((tab: number) => {
    setSelectedTab(tab);
    onChange(tab - 1);
  }, []);

  useEffect(() => {
    setSelectedTab(current);
  }, [current]);

  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.nav}>
          {tabs.map((item, i) => (
            <li
              key={item}
              className={cn(styles.item, {
                [styles.selected]: i + 1 === selectedTab,
              })}
              onClick={() => handleChangeTab(i + 1)}
            >
              {item}
              {i + 1 === selectedTab ? (
                <motion.div className={styles.underline} layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
