import Image from 'next/image';
import business from '@/assets/images/business.png';
import styles from './styles.module.scss';
import {Button} from '@/ui/Button/Button';
import ArrowSvg from '@/assets/icons/Arrow.svg';
import Chip from '@/app/testing/components/Chip/Chip';
import HeartSvg from '@/assets/icons/heart.svg';
import HeartSlashSvg from '@/assets/icons/heart-slash.svg';
import {CSSProperties, useEffect, useRef, useState} from 'react';
import NavBar from '@/app/testing/components/NavBar/NavBar';

interface InfoProps {
    title: string;
    stylesCustom: CSSProperties;
}

export default function Info({title, stylesCustom}: InfoProps) {
    const chipRef = useRef<HTMLDivElement>(null);
    const chipItems = ['Партнёрство', 'Коллаборации', 'Запуски', '2Коллаборации', '2Запуски'];

    const tabs = ['Романтическая', 'Деловая', 'Досуговая'];
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    return (
        <div className={styles.container}>

            <Image src={business} alt="Photo" className={styles.img} draggable={false}/>
            <div className={styles.info} style={stylesCustom}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.title}>{title}</h2>
                    <Button IconRight={ArrowSvg} variant={'default'} text={'Подробнее'}
                            onClick={() => console.log('next')}/>
                </div>
                <div className={styles.chips} ref={chipRef}>
                    {
                        chipItems.map((item, i) => {
                            if(i<3) {
                               return  <Chip text={item} key={item} />
                            }
                            return null;
                        })
                    }
                    {
                        chipItems.length > 3 && (<Chip text={`+${chipItems.length-3}`} />)
                    }
                </div>
                <span className={styles.text}>Я являюсь финансовым директором в сфере fin-tech, обладающим высокой квалификацией и опытом работы в финансовой сфере. </span>
                <div className={styles.btnContainer}>
                    <Button variant={'primary'} justify={'center'} text={'Нравится'} IconLeft={HeartSvg}
                            onClick={() => console.log('like')}/>
                    <Button variant={'secondary'} justify={'center'} text={'Нравится'} IconLeft={HeartSlashSvg}
                            onClick={() => console.log('dislike')}/>
                </div>
            </div>

        </div>
    )
}