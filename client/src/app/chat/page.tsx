"use client";
import business from "@/assets/images/elena.png";
import yandex from "@/assets/images/yandex.png";
import girl from "@/assets/images/girl.png";
import styles from "./page.module.scss";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { useRouter } from "next/navigation";
import Transition from "@/components/Transition/Transition";
import cn from 'classnames';
import Image from 'next/image';

export default function Chat() {
  const router = useRouter();

  return (
    <Transition>
      <div className={styles.container}>
        <h2 className={styles.title}>Чаты</h2>
        <div className={styles.chips}>
          <span className={cn(styles.chip, styles.activeChip)}>Все</span>
          <span className={styles.chip}>Анкеты</span>
          <span className={styles.chip}>Эвенты</span>
        </div>
        <div className={styles.items}>
          <div className={styles.item} onClick={() => router.push(`/chat/1`)}>
            <Image src={business} alt={'Image'} className={styles.img}/>
            <div className={styles.info}>

              <div className={styles.user}>
                <span className={styles.name}>Елена</span>
                <span className={styles.text}>Текст сообщения</span>
              </div>
              <span className={styles.time}>20:31</span>
            </div>
          </div>
          <div className={styles.item} onClick={() => router.push(`/chat/1`)}>
            <Image src={girl} alt={'Image'} className={styles.img}/>
            <div className={styles.info}>

              <div className={styles.user}>
                <span className={styles.name}>Ангелина</span>
                <span className={styles.text}>Текст сообщения</span>
              </div>
              <span className={styles.time}>20:31</span>
            </div>
          </div>
          <div className={styles.item} onClick={() => router.push(`/chat/1`)}>
            <Image src={yandex} alt={'Image'} className={styles.img}/>
            <div className={styles.info}>

              <div className={styles.user}>
                <span className={styles.name}>Яндекс</span>
                <span className={styles.text}>Текст сообщения</span>
              </div>
              <span className={styles.time}>20:31</span>
            </div>
          </div>
        </div>
        <TabBar className={styles.tabBar} tabs={[]} />
      </div>
      {/*<div className={styles.container}>*/}
      {/*  <Header*/}
      {/*    iconCompany={<YaSvg />}*/}
      {/*    iconUserSrc={business}*/}
      {/*    userNickname={"@valentinaa"}*/}
      {/*    userName={"Валентина"}*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    text={"Редактировать профиль"}*/}
      {/*    onClick={() => router.push("/profile/edit")}*/}
      {/*    variant={"secondary"}*/}
      {/*    IconLeft={UserSvg}*/}
      {/*    justify={"start"}*/}
      {/*    className={styles.btn}*/}
      {/*  />*/}
      {/*  <List items={formsItems} />*/}
      {/*  <Button*/}
      {/*    text={"Управление эвентами"}*/}
      {/*    onClick={() => router.push("/profile/events")}*/}
      {/*    variant={"secondary"}*/}
      {/*    IconLeft={EventSvg}*/}
      {/*    justify={"start"}*/}
      {/*    className={styles.btn}*/}
      {/*  />*/}
      {/*  <Button*/}
      {/*    text={"Буст анкеты"}*/}
      {/*    onClick={() => console.log("")}*/}
      {/*    variant={"secondary"}*/}
      {/*    IconLeft={BustSvg}*/}
      {/*    justify={"space-between"}*/}
      {/*    disabled={true}*/}
      {/*    className={styles.btnDisabled}*/}
      {/*    IconRight={() => <span className={styles.btnText}>Скоро</span>}*/}
      {/*  />*/}
      {/*  <List items={settingsItems} />*/}
      {/*  <TabBar className={styles.tabBar} tabs={[]} />*/}
      {/*</div>*/}
    </Transition>
  );
}
