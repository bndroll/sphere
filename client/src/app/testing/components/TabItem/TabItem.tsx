'use client'

import Image from 'next/image';
import LogoSvg from "@/assets/icons/logo.svg";
import styles from './styles.module.scss';
import {ReactNode, useEffect, useMemo} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import {usePathname} from 'next/navigation';
import {collectGenerateParams} from 'next/dist/build/utils';

interface TabItemProps {
    icon: ReactNode;
    title: string;
    href: string;
    counter?: number;
    onClick?: () => void;
}

export default function TabItem({ icon, title, href, counter, onClick }: TabItemProps) {
    const pathname = usePathname();
    let isActive = useMemo(() => pathname === href, [href, pathname]);

    return (
        <>
        {
            isActive ? <button className={cn(styles.tab, {[styles.active]: isActive})}> {
                counter && <span className={styles.counter}>{counter}</span>
            }
                {
                    icon
                }
                <span className={cn(styles.title, {[styles.active]: isActive})}>{title}</span>
            </button>
                :
                <Link className={cn(styles.tab, {[styles.active]: isActive})} href={href}>
                    {
                        counter && <span className={styles.counter}>{counter}</span>
                    }
                    {
                        icon
                    }
                    <span className={cn(styles.title, {[styles.active]: isActive})}>{title}</span>
                </Link>

        }
        </>
    )
}