import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "./styles.module.scss";
import { LoadPhoto } from "@/app/registry/components/FirstProfile/_compoents/LoadPhoto/LoadPhoto";
import { TextArea } from "@/ui/TextArea/TextArea";
import { InputTextRow } from "@/ui/InputTextRow/InputTextRow";
import { SwitchRow } from "@/ui/SwitchRow/SwitchRow";
import { SelectRow } from "@/ui/SelectRow/SelectRow";

export const FirstProfile = () => {
  return (
    <div className={styles.wrapper}>
      <TopBanner
        title="Заполним вашу анкету"
        label="Создание профиля"
        titleClassname={styles.bannerTitle}
      />
      <LoadPhoto />
      <TextArea />
      <div className={styles.form_block}>
        <SelectRow label="Город" />
        <SelectRow label="Образование" />
        <SelectRow label="Языки" />
      </div>
      <div className={styles.form_block}>
        <SelectRow label="Пол" />
        <InputTextRow label="Рост, см" placeholder="180" />
        <InputTextRow label="Email" placeholder="example@example.com" />
        <SwitchRow label="Курение" className={styles.switch} />
        <SwitchRow label="Алкоголь" className={styles.switch} />
      </div>
      <div className={styles.form_block}>
        <InputTextRow label="Телефон" placeholder="+7(000)000-000-00" />
        <InputTextRow label="Email" placeholder="example@example.com" />
        <InputTextRow label="Telegram" placeholder="@example" />
        <InputTextRow label="VK" placeholder="@example" />
        <InputTextRow label="Сайт" placeholder="www.example.com" />
      </div>
      <div className={styles.form_block} style={{ marginBottom: "11px" }}>
        <InputTextRow label="Должность" placeholder="Например, руководитель" />
        <InputTextRow label="Опыт" placeholder="Укажите опыт в годах" />
        <InputTextRow label="Статус" placeholder="Статус" />
        <InputTextRow label="Навыки" placeholder="Навыки" />
      </div>
    </div>
  );
};
