import styles from "./styles.module.scss";
import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import { useCallback, useContext } from "react";
import {
  ProfilesT,
  UserRegistryContext,
  UserRegistryContextType,
} from "@/utils/context/UserRegistryContext";
import { FirstProfile } from "@/app/registry/components/FirstProfile/FirstProfile";

export const ChooseFirstRegistry = () => {
  const { user, setPercent, setHideProgress, setStepProgress } =
    useContext<UserRegistryContextType>(UserRegistryContext);

  const handleClickCategory = useCallback((type: ProfilesT) => {
    setHideProgress(false);
    setPercent(44);
    setStepProgress(<FirstProfile categoryType={type} />);
  }, []);

  return (
    <div className={styles.wrapper}>
      <TopBanner
        title="Для какой категории заполним анкету в первую очередь?"
        label="Создание профиля"
        titleClassname={styles.bannerTitle}
      />
      <div className={styles.categories}>
        {user.enablesProfiles.map((profile) => (
          <div
            key={profile.title}
            className={styles.category}
            onClick={() => handleClickCategory(profile.type as ProfilesT)}
          >
            <span>{profile.icon}</span>
            <h3>{profile.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};
