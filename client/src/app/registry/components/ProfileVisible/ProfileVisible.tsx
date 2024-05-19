import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "@/app/registry/components/UsefulCategory/styles.module.scss";
import BusinessSVG from "@/assets/images/buisness.svg";
import { SwitchCheckBox } from "@/ui/SwitchCheckBox/SwitchCheckBox";
import DateSVG from "@/assets/images/date.svg";
import HobbiesSVG from "@/assets/images/hobbie.svg";

export const ProfileVisible = () => {
  return (
    <div className={styles.wrapper}>
      <TopBanner
        title="Выберите, какие анкеты будут видны другим в ленте"
        label="Создание профиля"
      />
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
          Вы всегда можете дозаполнить или изменить анкету в профиле.
        </span>
      </div>
    </div>
  );
};
