"use client"

import Transition from '@/components/Transition/Transition';
import {useRouter} from 'next/navigation';
import styles from './page.module.scss';
import YaSvg from '@/assets/icons/yandex.svg';
import buss from '@/assets/images/business.png';
import ArrowSvg from '@/assets/icons/arrowWhite.svg';
import TabBar from '@/app/feed/components/TabBar/TabBar';
import Image from 'next/image';
import cn from 'classnames';

export default function Page() {
    const router = useRouter();
    return(
        <Transition>
            <div className={styles.container}>
                <div className={styles.head}>
                    <button className={styles.btn} onClick={() => router.back()}>
                        <ArrowSvg />
                    </button>
                    <div className={styles.headInfo}>
                        <YaSvg />
                        <div className={styles.info}>
                            <span className={styles.title}>Яндекс</span>
                            <span className={styles.count}>26 участников</span>
                        </div>
                    </div>
                </div>
                <div className={styles.chat}>
                    <div className={styles.item}>
                        <Image src={buss} alt={'Image'} className={styles.img}/>
                        <div className={styles.msg}>
                            <span className={styles.name}>Елена</span>
                            <span className={styles.text}>Всероссийское соревнование по искусственному интеллекту и информационным технологиям в рамках цифровой среды Нейро.</span>
                        </div>
                    </div>
                    <div className={cn(styles.item, styles.myMsg)}>
                        <div className={cn(styles.msg, styles.my)}>
                            <span className={styles.text}>Привет!</span>
                        </div>
                    </div>
                </div>
                <TabBar tabs={[]} className={styles.tabBar}/>
            </div>
        </Transition>
    )
}