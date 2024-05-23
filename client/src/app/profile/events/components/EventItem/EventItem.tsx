import styles from './styles.module.scss';
import ChipEvent from '@/app/profile/events/components/ChipEvent/ChipEvent';
import ArrowSvg from '@/assets/icons/arrowWhite.svg';
import Image, {StaticImageData} from 'next/image';

export interface Chip {
    text: string;
    type: 'business' | 'romantic' | 'hobbies' | 'special' | 'default';
}

interface EventItemProps {
    title: string;
    iconEvent: StaticImageData;
    chips: Chip[];
}

export default function EventItem({ title, iconEvent, chips }: EventItemProps) {
    return (
        <div className={styles.container}>
            <Image src={iconEvent} alt={title} className={styles.img}/>
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