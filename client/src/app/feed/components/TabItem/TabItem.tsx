"use client";
import styles from "./styles.module.scss";
import {ReactNode, useMemo, useState} from 'react';
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";
import Menu from '@/app/testing/components/Menu/Menu';
import LikeSvg from '@/assets/icons/lovely.svg';
import BusinessSvg from '@/assets/icons/buisness.svg';
import HobbieSvg from '@/assets/icons/hobbie.svg';

interface TabItemProps {
  icon: ReactNode;
  title: string;
  href: string;
  tabs: string[];
  counter?: number;
  isMenu?: boolean;
  onMenuClick?: (tab: number) => void;
}

export default function TabItem({ icon, title, href, tabs, counter, isMenu, onMenuClick }: TabItemProps) {
  const pathname = usePathname();
  let isActive = useMemo(() => pathname === href, [href, pathname]);
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      text: "Деловая",
      icon: <BusinessSvg />
    },
    {
      text: "Романтическая",
      icon: <LikeSvg />
    },
    {
      text: "Досуговая",
      icon: <HobbieSvg />
    },
  ]

  if(isMenu) {
    if(isActive) {
      return (
          <div>
            <span className={cn(styles.tab, {[styles.active]: isActive})} onClick={() => setOpen((prev) => !prev)}>
            {counter && <span className={styles.counter}>{counter}</span>}
              {icon}
              <span className={cn(styles.title, {[styles.active]: isActive})}>
                {title}
              </span>
            </span>
            <Menu
                isOpen={open}
                items={menuItems}
                tabs={tabs}
                onClick={(tab: number) => {
                  if(onMenuClick) {
                    onMenuClick(tab);
                    setOpen(false);
                  }
                }}
            />
          </div>
      )
    }

    return <Link className={cn(styles.tab, {[styles.active]: isActive})} href={href}>
      {counter && <span className={styles.counter}>{counter}</span>}
      {icon}
      <span className={cn(styles.title, {[styles.active]: isActive})}>
        {title}
      </span>
    </Link>;
  }

  return (
      <Link className={cn(styles.tab, {[styles.active]: isActive})} href={href}>
      {counter && <span className={styles.counter}>{counter}</span>}
      {icon}
      <span className={cn(styles.title, { [styles.active]: isActive })}>
        {title}
      </span>
    </Link>
  );
}
