"use client";
import { Button } from "@/ui/Button/Button";
import { TextArea } from "@/ui/TextArea/TextArea";
import PlusSvg from "@/assets/icons/add.svg";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileBg from "@/assets/images/profile_bg.png";
import { useState } from "react";
import "react-mobile-datepicker-ts/dist/main.css";
import cn from "classnames";
import DatePicker from "react-mobile-datepicker-ts/";

const selections = {
  title: ["Mr.", "Mrs.", "Ms.", "Dr."],
  firstName: ["John", "Micheal", "Elizabeth"],
  lastName: ["Lennon", "Jackson", "Jordan", "Legend", "Taylor"],
};

export default function CreateEvent() {
  const router = useRouter();
  const [username, setUserName] = useState<string | number>("");

  // useEffect(() => {
  //   const a = async () => {
  //     try {
  //       const user = await findMe();
  //       setUserName(user.username);
  //     } catch (e) {}
  //   };
  //
  //   void a();
  // }, []);

  const handleCreateProfile = async () => {};
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSelect = (time: Date) => {
    setTime(time);
  };
  return (
    <div className={styles.container}>
      <Image
        src={ProfileBg}
        quality={100}
        width={430}
        height={170}
        className={styles.bg}
        alt=""
      />
      {/*<HeaderLoadPhoto*/}
      {/*  title="Загрузить логотип"*/}
      {/*  text="Рекомендуем загружать квадратное фото"*/}
      {/*/>*/}
      {/*<TextInput*/}
      {/*  placeholder="Имя организатора эвента"*/}
      {/*  value={username}*/}
      {/*  onChange={setUserName}*/}
      {/*/>*/}
      <div className={styles.card}>
        <label htmlFor="photo" className={styles.btnPlus}>
          <PlusSvg />
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/png, image/jpeg"
            className={styles.input}
          />
        </label>
        <span className={styles.cardName}>Обложка мероприятия</span>
        <span className={styles.cardText}>
          Рекомендуем вертикальные светлые фотографии в хорошем качестве,
          передающие атмосферу мероприятия.
        </span>
      </div>
      <TextArea placeholder="Название мероприятия" />
      <div className={styles.form}>
        <div className={styles.formItem}>
          {/*<SelectRow label="Город" options={cities} />*/}
          {/*<SelectRow label="Языки" options={languages} />*/}
          {/*<SwitchRow label="Закрытый" />*/}
        </div>
      </div>
      <div className={cn(styles.form, styles.datePicker)}>
        <DatePicker
          isPopup={false}
          theme="ios"
          showHeader={false}
          confirmText={""}
          cancelText={""}
          customHeader={<>Дата начала</>}
          value={time}
          isOpen={true}
          onSelect={handleSelect}
          onCancel={handleCancel}
        />
      </div>
      <div className={styles.form}>
        <div className={styles.formItem}>
          {/*<InputTextRow label="Телефон" placeholder="+7(000)000-00-00" />*/}
          {/*<InputTextRow label="Email" placeholder="example@example.com" />*/}
          {/*<InputTextRow label="Telegram" placeholder="@example" />*/}
          {/*<InputTextRow label="VK" placeholder="@example" />*/}
          {/*<InputTextRow label="Сайт" placeholder="www.example.com" />*/}
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.formItem}>{/*<SelectRow label="Теги" />*/}</div>
      </div>
      <Button
        text="Как мой эвент будут видеть другие?"
        onClick={() => console.log("")}
        className={styles.customBtn}
        variant="secondary"
        justify="start"
      />
      <div className={styles.btnWrap}>
        <Button
          text="Создать"
          onClick={handleCreateProfile}
          variant="primary"
        />
        <Button
          text="Отмена"
          onClick={() => router.back()}
          variant="secondary"
          className={styles.whiteText}
        />
      </div>
    </div>
  );
}
