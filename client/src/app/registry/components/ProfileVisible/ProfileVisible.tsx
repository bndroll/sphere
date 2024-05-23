import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "@/app/registry/components/UsefulCategory/styles.module.scss";
import BusinessSVG from "@/assets/images/buisness.svg";
import { SwitchCheckBox } from "@/ui/SwitchCheckBox/SwitchCheckBox";
import DateSVG from "@/assets/images/date.svg";
import HobbiesSVG from "@/assets/images/hobbie.svg";
import { useContext, useEffect, useState } from "react";
import {
  UserRegistryContext,
  UserRegistryContextType,
} from "@/utils/context/UserRegistryContext";
import { findProfiles } from "@/api/services/profile/find-by-user.api";
import { updateProfile } from "@/api/services/profile/update-profile.api";
import { useRouter } from "next/navigation";

export const ProfileVisible = () => {
  const {
    user,
    setPercent,
    setHideProgress,
    setStepProgress,
    categories,
    setProgressOnClick,
  } = useContext<UserRegistryContextType>(UserRegistryContext);
  const router = useRouter();

  const [networkVisible, setNetworkVisible] = useState(false);
  const [datingVisible, setDatingVisible] = useState(false);
  const [hobbiesVisible, setHobbiesVisible] = useState(false);

  const handleSetNetworkVisible = async (val: boolean) => {
    const id = categories.get("network")?.id;
    const p = await findProfiles();
    setNetworkVisible(val);
    const profile = p.find((prof) => prof.categoryId === id);
    if (profile && id) {
      await updateProfile({ ...profile, visible: val ? "Open" : "Close" }, id);
    }
  };
  const handleSetHobbiesVisible = async (val: boolean) => {
    const id = categories.get("hobbies")?.id;
    const p = await findProfiles();
    setDatingVisible(val);
    const profile = p.find((prof) => prof.categoryId === id);
    if (profile && id) {
      await updateProfile({ ...profile, visible: val ? "Open" : "Close" }, id);
    }
  };
  const handleSetDatingVisible = async (val: boolean) => {
    const id = categories.get("dating")?.id;
    const p = await findProfiles();
    setHobbiesVisible(val);
    const profile = p.find((prof) => prof.categoryId === id);
    if (profile && id) {
      await updateProfile({ ...profile, visible: val ? "Open" : "Close" }, id);
    }
  };

  useEffect(() => {
    setProgressOnClick(() => router.push("/feed"));
  }, []);

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
              {user.enablesProfiles.some(
                (prof) => prof.isUpdated && prof.type === "network",
              ) ? (
                <SwitchCheckBox
                  value={networkVisible}
                  onChange={handleSetNetworkVisible}
                />
              ) : (
                <span className={styles.empty}>Пустая анкета</span>
              )}
            </div>
          </div>
          <div className={styles.prefenses}>
            <DateSVG />
            <div className={styles.item}>
              <p className={styles.label}>Романтические отношения</p>
              {user.enablesProfiles.some(
                (prof) => prof.isUpdated && prof.type === "dating",
              ) ? (
                <SwitchCheckBox
                  value={datingVisible}
                  onChange={handleSetDatingVisible}
                />
              ) : (
                <span className={styles.empty}>Пустая анкета</span>
              )}
            </div>
          </div>
          <div className={styles.prefenses}>
            <HobbiesSVG />
            <div className={styles.item}>
              <p className={styles.label}>Приятный досуг</p>
              {user.enablesProfiles.some(
                (prof) => prof.isUpdated && prof.type === "hobbies",
              ) ? (
                <SwitchCheckBox
                  value={hobbiesVisible}
                  onChange={handleSetHobbiesVisible}
                />
              ) : (
                <span className={styles.empty}>Пустая анкета</span>
              )}
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
