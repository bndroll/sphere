import TabItem from '@/app/testing/components/TabItem/TabItem';
import styles from './styles.module.scss';
import LovelySvg from "@/assets/icons/lovely.svg";
import FormSvg from "@/assets/icons/tape.svg";
import MessSvg from '@/assets/icons/messenger.svg';
import UserSvg from '@/assets/icons/user.svg';
import {ReactNode} from 'react';

export default function TabBar() {
    interface Item {
        icon?: ReactNode;
        title: string;
        href: string;
        counter?: number;
    }
    const items: Item[] = [
        {
            icon: <LovelySvg />,
            title: 'События',
            href: '/',
            counter: 10,
        },
        {
            icon: <FormSvg />,
            title: 'Лента',
            href: '/'
        },
        {
            icon: <MessSvg />,
            title: 'Мессенеджер',
            href: '/',
            counter: 151,
        },
        {
            icon: <UserSvg />,
            title: 'Профиль',
            href: '/profile',
        },
    ]
    return (
        <div className={styles.container}>
            {
                items.map((item) => (
                    <TabItem icon={item.icon} title={item.title} href={item.href} key={item.title} counter={item.counter}/>
                ))
            }
        </div>
    )
}