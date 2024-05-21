import styles from './styles.module.scss';
import {useState} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import cn from 'classnames';

interface NavBarProps {
    navItems: string[];
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}

export default function NavBar({navItems, selectedTab, setSelectedTab}: NavBarProps) {
    return (
        <div className={styles.container}>
            <nav>
                <ul className={styles.nav}>
                    {navItems.map((item) => (
                        <li
                            key={item}
                            className={ cn(styles.item, {[styles.selected]: item === selectedTab})}
                            onClick={() => setSelectedTab(item)}
                        >
                            {item}
                            {item === selectedTab ? (
                                <motion.div className={styles.underline} layoutId="underline"/>
                            ) : null}
                        </li>
                    ))}
                </ul>
            </nav>
            {/*<AnimatePresence mode="wait">*/}
            {/*    <motion.div*/}
            {/*        key={selectedTab ? selectedTab : "empty"}*/}
            {/*        initial={{ x: -100, opacity: 0 }}*/}
            {/*        animate={{ x: 0, opacity: 1 }}*/}
            {/*        exit={{ x: -10, opacity: 0 }}*/}
            {/*        transition={{ duration: 0.2 }}*/}
            {/*        drag={'x'}*/}
            {/*    >*/}
            {/*        {selectedTab}*/}
            {/*    </motion.div>*/}
            {/*</AnimatePresence>*/}
        </div>
    )
}