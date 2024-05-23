'use client'

import styles from './page.module.scss';
import EventItem, {Chip} from '@/app/profile/events/components/EventItem/EventItem';
import PlusSvg from '@/assets/icons/add.svg';
import {ReactNode} from 'react';
import {Button} from '@/ui/Button/Button';
import TabBar from '@/app/feed/components/TabBar/TabBar';
import {useRouter} from 'next/navigation';
import {StaticImageData} from 'next/image';
import hackhaton from '@/assets/images/hackhaton.png';
import bicycle from '@/assets/images/bicycle.png';
import dinner from '@/assets/images/dinner.png';
import ai from '@/assets/images/ai.png';

interface EventItem {
    title: string;
    iconEvent: StaticImageData;
    chips: Chip[];
}

export default function Events() {
    const router = useRouter();
    const events: EventItem[] = [
        {
            title: 'Хакатон AI Tools ‘24',
            iconEvent: hackhaton,
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
            iconEvent: bicycle,
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
            iconEvent: ai,
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
            iconEvent: dinner,
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
                <Button
                    text='Создать эвент'
                    onClick={() => router.push('/profile/events/createEvent')}
                    IconLeft={() => <PlusSvg/>}
                    justify='center'
                    variant='primary'
                />
            </div>
            <TabBar tabs={[]} className={styles.tabBar}/>
        </div>
    )
}