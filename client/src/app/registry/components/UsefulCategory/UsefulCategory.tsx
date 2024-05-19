import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import { TextInput } from "@/ui/TextInput/TextInput";
import styles from "./styles.module.scss";
import BusinessSVG from "@/assets/images/buisness.svg";
import DateSVG from "@/assets/images/date.svg";
import HobbiesSVG from "@/assets/images/hobbie.svg";
import { SwitchCheckBox } from "@/ui/SwitchCheckBox/SwitchCheckBox";

export const UsefulCategory = () => {
  return (
    <div className={styles.wrapper}>
      <TopBanner title="Давайте познакомимся" label="Создание профиля" />
      <div className={styles.form}>
        <TextInput placeholder="Ваше имя" />
      </div>
      <div className={styles.f_wrap}>
        <div className={styles.block_form}>
          <div className={styles.prefenses}>
            <BusinessSVG />
            <div className={styles.item}>
              <p className={styles.label}>Деловые знакомства</p>
              <SwitchCheckBox />
            </div>
          </div>
          <div className={styles.prefenses}>
            <DateSVG />
            <div className={styles.item}>
              <p className={styles.label}>Романтические отношения</p>
              <SwitchCheckBox />
            </div>
          </div>
          <div className={styles.prefenses}>
            <HobbiesSVG />
            <div className={styles.item}>
              <p className={styles.label}>Приятный досуг</p>
              <SwitchCheckBox />
            </div>
          </div>
        </div>
        <span className={styles.notion}>
          На основе выбранных вами категорий будут созданы анкеты.
        </span>
      </div>
    </div>
  );
};
