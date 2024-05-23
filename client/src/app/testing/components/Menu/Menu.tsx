'use client'
import styles from './styles.module.scss';
import MenuSvg from '@/assets/icons/menu.svg';
import {ReactNode} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import cn from 'classnames';

interface MenuItem {
    text: string;
    icon: ReactNode;
}

interface MenuProps {
    isOpen: boolean;
    items: MenuItem[];
    tabs: string[];
    onClick?: (tab: number) => void;
}

export default function Menu({items, isOpen, tabs, onClick}: MenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div>
                    <motion.div className={styles.backdrop}></motion.div>
                    <motion.div
                        className={styles.menu}
                        initial={{y: '-100%', x: '-8%', opacity: 0, width: 200}}
                        animate={{x: '-8%', y: '-126%', opacity: 1, width: 228}}
                        exit={{y: '-100%', x: '-8%', opacity: 0, width: 200}}
                        transition={{ duration: 0.2 }}
                    >
                        <ul className={styles.list}>
                            {
                                items.map((item, index) => (
                                    <li
                                        key={item.text}
                                        className={cn(styles.item, {[styles.borderNone]: index === items.length-1})}
                                        onClick={() => {
                                            if(onClick) {
                                                onClick(tabs.indexOf(item.text));
                                            }
                                        }}
                                    >
                                        {item.text}
                                        {item.icon}
                                    </li>))
                            }
                        </ul>
                        <div>
                            <button className={styles.btn}>
                                Настройки ленты
                                <MenuSvg/>
                            </button>
                        </div>
                    </motion.div>
                </div>

            )}
        </AnimatePresence>

    )
}