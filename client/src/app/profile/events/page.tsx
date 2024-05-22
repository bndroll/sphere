'use client'

import styles from './page.module.scss';
import EventItem, {Chip} from '@/app/profile/events/components/EventItem/EventItem';
import DinnerSvg from '@/assets/icons/dinner.svg';
import BicycleSvg from '@/assets/icons/bicycle.svg';
import AiSvg from '@/assets/icons/ai.svg';
import HackathonSvg from '@/assets/icons/hackathon.svg';
import PlusSvg from '@/assets/icons/add.svg';
import {ReactNode} from 'react';
import {Button} from '@/ui/Button/Button';
import TabBar from '@/app/feed/components/TabBar/TabBar';

interface EventItem {
    title: string;
    iconEvent: ReactNode;
    chips: Chip[];
}

export default function Events() {
    const events: EventItem[] = [
        {
            title: 'Хакатон AI Tools ‘24',
            iconEvent: <HackathonSvg />,
            chips: [
                {
                    text: 'Деловой',
                    type: 'business'
                },
                {
                    text: 'Буст до 19.06.24',
                    type: 'default'
                },
            ]
        },
        {
            title: 'Прогулка на велосипедах',
            iconEvent: <BicycleSvg />,
            chips: [
                {
                    text: 'Досуговый',
                    type: 'hobbies'
                },
                {
                    text: '2 дня до начала',
                    type: 'special'
                }
            ]
        },
        {
            title: 'Ai-Engineering MeetUp',
            iconEvent: <AiSvg />,
            chips: [
                {
                    text: 'Деловой',
                    type: 'business'
                },
                {
                    text: 'Буст до 24.07.24',
                    type: 'default'
                }
            ]
        },
        {
            title: 'Парный ужин на берегу Волги',
            iconEvent: <DinnerSvg />,
            chips: [
                {
                    text: 'Романтический',
                    type: 'romantic'
                },
            ]
        },
    ]
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Мои эвенты</h2>
            <div className={styles.content}>
                <div className={styles.events}>
                    {
                        events.map((item) => (
                            <EventItem key={item.title} title={item.title} iconEvent={item.iconEvent}
                                       chips={item.chips}/>
                        ))
                    }
                </div>
                <Button text={'Создать эвент'} onClick={() => console.log('1')} IconLeft={() => <PlusSvg/>}
                        justify={'center'} variant={'primary'}/>
            </div>
            <TabBar tabs={[]} className={styles.tabBar}/>
        </div>
    )
}