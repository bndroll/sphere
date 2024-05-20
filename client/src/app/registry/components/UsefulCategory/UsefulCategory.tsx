"use client";
import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "./styles.module.scss";
import BusinessSVG from "@/assets/images/buisness.svg";
import DateSVG from "@/assets/images/date.svg";
import HobbiesSVG from "@/assets/images/hobbie.svg";
import { SwitchCheckBox } from "@/ui/SwitchCheckBox/SwitchCheckBox";
import { FC, useEffect, useState } from "react";
import { TextInput } from "@/ui/TextInput/TextInput";

type Props = {
  isAvailableNextPage?: (val: boolean) => void;
};
export const UsefulCategory: FC<Props> = ({ isAvailableNextPage }) => {
  const [username, setUsername] = useState<string | number>("");
  const [isNetworking, setNetworking] = useState(false);
  const [isDating, setDating] = useState(false);
  const [isHobbies, setHobbies] = useState(false);

  useEffect(() => {
    if (
      username.toString().length > 3 &&
      (isNetworking || isHobbies || isDating)
    )
      isAvailableNextPage?.(false);
    else isAvailableNextPage?.(true);
  }, [isAvailableNextPage, isDating, isHobbies, isNetworking, username]);

  return (
    <div className={styles.wrapper}>
      <TopBanner title="Давайте познакомимся" label="Создание профиля" />
      <div className={styles.form}>
        <TextInput
          placeholder="Ваше имя"
          value={username}
          onChange={setUsername}
        />
      </div>
      <div className={styles.f_wrap}>
        <div className={styles.block_form}>
          <div className={styles.prefenses}>
            <BusinessSVG />
            <div className={styles.item}>
              <p className={styles.label}>Деловые знакомства</p>
              <SwitchCheckBox value={isNetworking} onChange={setNetworking} />
            </div>
          </div>
          <div className={styles.prefenses}>
            <DateSVG />
            <div className={styles.item}>
              <p className={styles.label}>Романтические отношения</p>
              <SwitchCheckBox value={isDating} onChange={setDating} />
            </div>
          </div>
          <div className={styles.prefenses}>
            <HobbiesSVG />
            <div className={styles.item}>
              <p className={styles.label}>Приятный досуг</p>
              <SwitchCheckBox value={isHobbies} onChange={setHobbies} />
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
