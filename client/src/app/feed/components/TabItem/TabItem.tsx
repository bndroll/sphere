"use client";

import styles from "./styles.module.scss";
import { ReactNode, useMemo } from "react";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";

interface TabItemProps {
  icon: ReactNode;
  title: string;
  href: string;
  counter?: number;
}

export default function TabItem({ icon, title, href, counter }: TabItemProps) {
  const pathname = usePathname();
  let isActive = useMemo(() => pathname === href, [href, pathname]);

  return (
    <Link className={cn(styles.tab, { [styles.active]: isActive })} href={href}>
      {counter && <span className={styles.counter}>{counter}</span>}
      {icon}
      <span className={cn(styles.title, { [styles.active]: isActive })}>
        {title}
      </span>
    </Link>
  );
}
