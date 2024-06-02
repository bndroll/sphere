"use client";
import { TextInput } from "@/ui/TextInput/TextInput";
import { InputTextRow } from "@/ui/InputTextRow/InputTextRow";
import { SelectRow } from "@/ui/SelectRow/SelectRow";
import { SwitchRow } from "@/ui/SwitchRow/SwitchRow";
import { Button } from "@/ui/Button/Button";
import { TextArea } from "@/ui/TextArea/TextArea";
import PlusSvg from "@/assets/icons/add.svg";
import styles from "./page.module.scss";
import HeaderLoadPhoto from "@/app/profile/components/HeaderLoadPhoto/HeaderLoadPhoto";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
  const router = useRouter();

  const handleCreateProfile = async () => {};

  return (
    <div className={styles.container}>
      <HeaderLoadPhoto
        title="Загрузить логотип"
        text="Рекомендуем загружать квадратное фото"
      />
      <TextInput placeholder="Имя организатора эвента" />
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
          Рекомендуем вертикальные светлые фотографии в хорошем качестве,
          передающие атмосферу мероприятия.
        </span>
      </div>
      <TextArea placeholder="Название мероприятия" />
      <div className={styles.form}>
        <div className={styles.formItem}>
          <SelectRow label={"Город"} />
          <SelectRow label={"Языки"} />
          <SwitchRow label="Закрытый" />
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.formItem}>
          <InputTextRow label={"Телефон"} placeholder={"+7(000)000-00-00"} />
          <InputTextRow label={"Email"} placeholder={"example@example.com"} />
          <InputTextRow label={"Telegram"} placeholder={"@example"} />
          <InputTextRow label={"VK"} placeholder={"@example"} />
          <InputTextRow label={"Сайт"} placeholder={"www.example.com"} />
        </div>
      </div>
      <div className={styles.form}>
        <div className={styles.formItem}>
          <SelectRow label="Теги" />
        </div>
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
