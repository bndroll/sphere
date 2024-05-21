"use client"
import TabBar from '@/app/testing/components/TabBar/TabBar';
import Info from '@/app/testing/components/Info/Info';
import styles from './page.module.scss';
import NavBar from '@/app/testing/components/NavBar/NavBar';
import {useState} from 'react';
import {motion, useDragControls, wrap} from 'framer-motion';

export default function Questionnaire() {
    const lentaItem = [ 'Романтическая', 'Деловая', 'Досуговая'];
    const [selectedTab, setSelectedTab] = useState(lentaItem[0]);
    const [customStyles, setCustomStyles] = useState({});

    function changeSelectedTab(tab: string) {
        setSelectedTab(tab);
        console.log(lentaItem.indexOf(tab), lentaItem.indexOf(selectedTab));
        paginate(lentaItem.indexOf(tab)-lentaItem.indexOf(selectedTab));
    }

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 1,
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 1,
            };
        },
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const [[page, direction], setPage] = useState([0, 0]);

    const imageIndex = wrap(0, lentaItem.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className={styles.container}>
            <NavBar navItems={lentaItem} setSelectedTab={changeSelectedTab} selectedTab={selectedTab}/>
                <motion.div
                    // key={page}
                    // src={images[imageIndex]}
                    // custom={directioxn}
                    // variants={variants}

                    // initial={'enter'}
                    animate={{ x: `-${imageIndex * 100}%`} }
                    // exit={"exit"}
                    transition={{
                        x: { type: "spring", stiffness: 500, damping: 70 },
                        opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    // dragElastic={1}
                    // dragControls={false}
                    // dragListener={imageIndex!==2}
                    // dragMomentum={false}
                    onDragStart={() => setCustomStyles({opacity: 0.5})}
                    dragConstraints={{ left: 0, right: 0 }}
                    // dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        console.log(swipe, swipeConfidenceThreshold, swipe < swipeConfidenceThreshold);

                        if (swipe < -swipeConfidenceThreshold) {
                            console.log(1, imageIndex)
                            // if(imageIndex !== 2) {
                                paginate(1);
                                setSelectedTab(lentaItem[imageIndex+1]);
                            // }
                        }
                        else if (swipe > swipeConfidenceThreshold) {
                            console.log(2);
                            paginate(-1);
                            setSelectedTab(lentaItem[imageIndex-1]);
                        }

                        setCustomStyles({opacity: 1});
                    }}
                    className={styles.swiper}
                >
                    <div className={styles.swiper}>
                        {
                            lentaItem.map(item => <Info stylesCustom={customStyles} title={item} key={item}/>)
                        }
                    </div>
                </motion.div>
            <TabBar/>
        </div>
    )
}