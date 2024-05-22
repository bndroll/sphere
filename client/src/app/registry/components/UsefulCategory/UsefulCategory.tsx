"use client";
import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "./styles.module.scss";
import BusinessSVG from "@/assets/images/buisness.svg";
import DateSVG from "@/assets/images/date.svg";
import HobbiesSVG from "@/assets/images/hobbie.svg";
import { SwitchCheckBox } from "@/ui/SwitchCheckBox/SwitchCheckBox";
import { FC, useContext, useEffect, useState } from "react";
import { TextInput } from "@/ui/TextInput/TextInput";
import {
  ProfilesT,
  UserRegistryContext,
  UserRegistryContextType,
} from "@/utils/context/UserRegistryContext";
import { ChooseFirstRegistry } from "@/app/registry/components/ChooseRegistry/ChooseRegistry";
import { getCategories } from "@/api/services/category/category.api";

type Props = {
  isAvailableNextPage?: (val: boolean) => void;
};
export const UsefulCategory: FC<Props> = ({ isAvailableNextPage }) => {
  const [username, setUsername] = useState<string | number>("");
  const [isNetworking, setNetworking] = useState(false);
  const [isDating, setDating] = useState(false);
  const [isHobbies, setHobbies] = useState(false);

  const {
    setFirstStep,
    setStepProgress,
    setProgressOnClick,
    setPercent,
    setCountStep,
    setHideProgress,
    setAllCategories,
  } = useContext<UserRegistryContextType>(UserRegistryContext);

  useEffect(() => {
    if (
      username.toString().length > 3 &&
      (isNetworking || isHobbies || isDating)
    ) {
      const profiles: ProfilesT[] = [];

      if (isNetworking) profiles.push("network");
      if (isDating) profiles.push("dating");
      if (isHobbies) profiles.push("hobbies");
      setFirstStep(username.toString(), profiles);
      setProgressOnClick(() => {
        setStepProgress(<ChooseFirstRegistry />);
        setPercent(40);
        setCountStep(2);
        setHideProgress(true);
      });
    }
  }, [isDating, isHobbies, isNetworking, username]);

  useEffect(() => {}, [
    username,
    isDating,
    isHobbies,
    isNetworking,
    setFirstStep,
  ]);

  useEffect(() => {
    const a = async () => {
      const b = await getCategories();
      setAllCategories(b);
    };
    void a();
  }, [setAllCategories]);

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
