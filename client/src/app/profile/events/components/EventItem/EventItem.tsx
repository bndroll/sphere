import styles from './styles.module.scss';
import {ReactNode} from 'react';
import ChipEvent from '@/app/profile/events/components/ChipEvent/ChipEvent';
import ArrowSvg from '@/assets/icons/arrowWhite.svg';

export interface Chip {
    text: string;
    type: 'business' | 'romantic' | 'hobbies' | 'special' | 'default';
}

interface EventItemProps {
    title: string;
    iconEvent: ReactNode;
    chips: Chip[];
}

export default function EventItem({ title, iconEvent, chips }: EventItemProps) {
    return (
        <div className={styles.container}>
            {
                iconEvent
            }
            <div className={styles.content}>
                <div className={styles.info}>
                    <span className={styles.title}>{title}</span>
                    <div className={styles.chips}>
                        {
                            chips && chips.map((item) => (
                                <ChipEvent text={item.text} type={item.type} key={item.text}/>
                            ))
                        }
                    </div>
                </div>
                <button className={styles.btn}>
                    <ArrowSvg/>
                </button>
            </div>
        </div>
    )
}