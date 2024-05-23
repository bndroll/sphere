import { useContext, useEffect } from "react";
import {
  ProfilesT,
  UserRegistryContext,
  UserRegistryContextType,
} from "@/utils/context/UserRegistryContext";
import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "@/app/registry/components/ChooseRegistry/styles.module.scss";
import SkipSVG from "@/assets/icons/skip.svg";
import { FirstProfile } from "@/app/registry/components/FirstProfile/FirstProfile";
import { ProfileVisible } from "@/app/registry/components/ProfileVisible/ProfileVisible";

export const AnotherProfiles = () => {
  const { user, setPercent, setHideProgress, setStepProgress, setCountStep } =
    useContext<UserRegistryContextType>(UserRegistryContext);

  const handleClickCategory = (str: ProfilesT) => {
    setStepProgress(<FirstProfile categoryType={str} />);
    setHideProgress(false);
  };

  useEffect(() => {
    if (user.enablesProfiles.every((prof) => prof.isUpdated))
      setStepProgress(<ProfileVisible />);
    setHideProgress(false);
    setPercent(90);
    setCountStep(3);
  }, [setStepProgress, setHideProgress, user.enablesProfiles]);

  const onClickSkip = () => {
    setStepProgress(<ProfileVisible />);
  };

  return (
    <div className={styles.wrapper}>
      <TopBanner
        title="Заполним анкеты других категорий для роста знакомств?"
        label="Создание профиля"
        titleClassname={styles.bannerTitle}
      />
      <div className={styles.categories}>
        {user.enablesProfiles.map((profile) => (
          <>
            {!profile.isUpdated && (
              <div
                key={profile.title}
                className={styles.category}
                onClick={() => handleClickCategory(profile.type as ProfilesT)}
              >
                <span>{profile.icon}</span>
                <h3>{profile.title}</h3>
              </div>
            )}
          </>
        ))}
        <div className={styles.category} onClick={onClickSkip}>
          <span>
            <SkipSVG />
          </span>
          <h3>Пропустить заполнение анкет</h3>
        </div>
      </div>
    </div>
  );
};
