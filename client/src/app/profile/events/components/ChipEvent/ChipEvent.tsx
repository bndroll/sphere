import BuisnessSvg from '@/assets/icons/buisness.svg';
import RomanticSvg from '@/assets/icons/heart.svg';
import FlashSvg from '@/assets/icons/flashWhite.svg';
import HobbieSvg from '@/assets/icons/hobbie.svg';

import styles from './styles.module.scss';
import cn from 'classnames';

interface ChipEventProps {
    text: string;
    type: 'business' | 'romantic' | 'hobbies' | 'special' | 'default';
}

export default function ChipEvent({ text, type }: ChipEventProps) {
    return (
        <div className={
            cn(
                styles.chip, {
                    [styles.blue]: type === 'business',
                    [styles.orange]: type === 'hobbies',
                    [styles.purple]: type === 'special',
                    [styles.pink]: type === 'romantic'
                }
            )}
        >
            {
                type === 'business' && (<BuisnessSvg className={styles.icon}/>)
            }
            {
                type === 'romantic' && (<RomanticSvg className={styles.icon}/>)
            }
            {
                type === 'hobbies' && (<HobbieSvg className={styles.icon}/>)
            }
            <span
                className={cn(styles.text, {[styles.black]: type === 'hobbies', [styles.white]: type !== 'hobbies' })}
            >
                { text }
            </span>
            {type === 'default' && <FlashSvg/>}
        </div>
    )
}