"use client";

import TabItem from "@/app/feed/components/TabItem/TabItem";
import styles from "./styles.module.scss";
import LovelySvg from "@/assets/icons/lovely.svg";
import FormSvg from "@/assets/icons/tape.svg";
import MessSvg from "@/assets/icons/messenger.svg";
import UserSvg from "@/assets/icons/user.svg";
import { ReactNode } from "react";
import cn from "classnames";

interface TabBarProps {
  tabs: string[];
  className?: string;
  onMenuClick?: (tab: number) => void;
}

interface Item {
  icon?: ReactNode;
  title: string;
  href: string;
  counter?: number;
  isMenu?: boolean;
}

export default function TabBar({ tabs, className, onMenuClick }: TabBarProps) {
  const items: Item[] = [
    {
      icon: <LovelySvg />,
      title: "События",
      href: "/events",
    },
    {
      icon: <FormSvg />,
      title: "Лента",
      href: "/feed",
      isMenu: true,
    },
    {
      icon: <MessSvg />,
      title: "Мессенеджер",
      href: "/chat",
    },
    {
      icon: <UserSvg />,
      title: "Профиль",
      href: "/profile",
    },
  ];
  return (
    <div className={cn(styles.container, className)}>
      {items.map((item) => (
        <TabItem
          icon={item.icon}
          title={item.title}
          href={item.href}
          key={item.title}
          counter={item.counter}
          isMenu={item.isMenu}
          onMenuClick={onMenuClick}
          tabs={tabs}
        />
      ))}
    </div>
  );
}
