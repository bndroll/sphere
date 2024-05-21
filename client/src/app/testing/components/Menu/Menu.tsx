import styles from './styles.module.scss';
import MenuSvg from '@/assets/icons/menu.svg';
import {ReactNode} from 'react';
import { motion, sync, useCycle } from "framer-motion";

interface MenuProps {
    isOpen: boolean;
    items: string[];
    icon: ReactNode;
}

export default function Menu({items, icon, isOpen}: MenuProps) {
    const sidebar = {
        open: (height = 100) => ({
            clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        }),
        closed: {
            clipPath: "circle(30px at 40px 40px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };
    // const [isOpen, toggleOpen] = useCycle(false, true);
    return (
        <motion.div
            className={styles.menu}
            animate={isOpen ? "open" : "closed"}
            variants={sidebar}
        >
            <ul>
                {
                    items.map((item) => (
                        <li key={item}>
                            {item}
                            {icon}
                        </li>))
                }
            </ul>
            <div>
                <button>Настройки ленты</button>
                <MenuSvg />
            </div>
        </motion.div>
    )
}