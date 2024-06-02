import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "./styles.module.scss";
import { TextArea } from "@/ui/TextArea/TextArea";
import { InputTextRow } from "@/ui/InputTextRow/InputTextRow";
import { SelectRow } from "@/ui/SelectRow/SelectRow";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import {
  ProfilesT,
  UserProfile,
  UserRegistryContext,
  UserRegistryContextType,
} from "@/utils/context/UserRegistryContext";
import { PhotoLoad } from "@/components/PhotoLoad/PhotoLoad";
import {
  cities,
  education,
  hobbiesOptions,
  languages,
  skills,
  workStatus,
} from "@/app/registry/components/FirstProfile/first_profile.constants";
import { CategoryT } from "@/api/services/category/category.types";
import { useRouter } from "next/navigation";
import { createProfile } from "@/api/services/profile/profile.api";
import { AnotherProfiles } from "@/app/registry/components/AnotherProfiles/AnotherProfiles";

type Props = {
  categoryType: ProfilesT;
};
export const FirstProfile: FC<Props> = ({ categoryType }) => {
  const {
    categories,
    setSecondStep,
    user,
    setProgressOnClick,
    setStepProgress,
    setPercent,
    setCountStep,
    setHideProgress,
    setEnabledProfile,
  } = useContext<UserRegistryContextType>(UserRegistryContext);

  const router = useRouter();

  const [category, setCategory] = useState<CategoryT | undefined>();
  const [tagsIds, setTagsIds] = useState([]);
  const [about, setAbout] = useState("");
  const [pickture, setPickture] = useState("");
  const [city, setCity] = useState("Москва");
  const [userEducation, setEducation] = useState("Основное общее образование");
  const [userLanguage, setUserLanguage] = useState<string[]>(["Русский"]);
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userTelegram, setUserTelegram] = useState("");
  const [userVk, setUserVk] = useState("");
  const [userSite, setUserSite] = useState("");
  const [userGender, setUserGender] = useState("Мужской");
  const [userHeight, setUserHeight] = useState("");
  const [userAlcohol, setUserAlcohol] = useState(false);
  const [userSmoking, setUserSmoking] = useState(false);
  const [userPost, setUserPost] = useState("");
  const [userExpiriens, setUserExpiriens] = useState("");
  const [userSkills, setUserSkills] = useState(["Анализ данных"]);
  const [userStatus, setUserStatus] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const categoryTags = useCallback(() => {
    return category?.tags.map((c) => c.title);
  }, [category]);

  const handleCreateProfile = useCallback(async () => {
    const data: UserProfile = {
      categoryId: category?.id!,
      type: "User",
      visible: user.enablesProfiles.length === 1 ? "Open" : "Close",
      tagsId:
        category?.tags.filter((c) => tags.includes(c.title)).map((t) => t.id) ??
        [],
      info: {
        name: user.username,
        about: about,
        picture: pickture,
        city: city,
        education: userEducation,
        contacts: {
          phone: userPhone,
          email: userEmail,
          telegram: userTelegram,
          vk: userVk,
          site: userSite,
        },
        dating: {
          gender: userGender === "Мужской" ? "Male" : "Female",
          height: userHeight,
          alcohol: userAlcohol ? "Да" : "Нет",
          smoking: userSmoking ? "Да" : "Нет",
        },
        work: {
          post: userPost,
          experience: userExpiriens,
          skills: userSkills,
          status: userStatus,
        },
        hobby: {
          hobbies: hobbies,
        },
      },
    };
    try {
      await createProfile(data);
      router.push("/feed");
    } catch (r) {}
  }, [
    about,
    userSite,
    userVk,
    userEmail,
    userTelegram,
    userPhone,
    userEducation,
    city,
    pickture,
    category,
    user,
    tags,
    hobbies,
    userStatus,
    userSkills,
    userExpiriens,
    userPost,
    userSmoking,
    userAlcohol,
    userHeight,
    userGender,
  ]);

  useEffect(() => {
    setCategory(categories.get(categoryType));
    setProgressOnClick(async () => {
      await handleCreateProfile();
      setEnabledProfile(categoryType);
      if (user.enablesProfiles.length === 1) {
        router.push("/feed");
      } else {
        setStepProgress(<AnotherProfiles />);
        setPercent(60);
        setHideProgress(true);
      }
    });
  }, [
    categories,
    categoryType,
    handleCreateProfile,
    about,
    userSite,
    userVk,
    userEmail,
    userTelegram,
    userPhone,
    userEducation,
    city,
    pickture,
    category,
    user,
    tags,
    hobbies,
    userStatus,
    userSkills,
    userExpiriens,
    userPost,
    userSmoking,
    userAlcohol,
    userHeight,
    userGender,
  ]);

  return (
    <div className={styles.wrapper}>
      <TopBanner
        title="Заполним вашу анкету"
        label="Создание профиля"
        titleClassname={styles.bannerTitle}
      />
      <PhotoLoad onUpload={setPickture} />
      <TextArea
        placeholder="Я являюсь финансовым директором в сфере fin-tech, обладающим высокой квалификацией и отпытом работы в финансовой сфере"
        value={about}
        onChange={setAbout}
      />
      <div className={styles.form_block}>
        <SelectRow
          label="Город"
          options={cities}
          value={city}
          onChange={setCity}
        />
        <SelectRow
          label="Образование"
          options={education}
          value={userEducation}
          onChange={setEducation}
        />
        <SelectRow
          label="Языки"
          options={languages}
          value={userLanguage}
          multiSelect
          onMultiChange={setUserLanguage}
        />
      </div>
      <div className={styles.form_block}>
        <SelectRow
          label="Пол"
          options={["Мужской", "Женский"]}
          value={userGender}
          onChange={setUserGender}
        />
        <InputTextRow
          label="Рост, см"
          placeholder="180"
          type="number"
          value={userHeight}
          onChange={setUserHeight}
        />
        <InputTextRow
          label="Email"
          placeholder="example@example.com"
          value={userEmail}
          onChange={setUserEmail}
        />
        <SelectRow
          label="Хобби"
          placeholder="Хобби"
          value={hobbies}
          onMultiChange={setHobbies}
          multiSelect
          options={hobbiesOptions}
        />
      </div>
      <div className={styles.form_block}>
        <InputTextRow
          label="Телефон"
          value={userPhone}
          onChange={setUserPhone}
          placeholder="+7(000)000-000-00"
        />
        <InputTextRow
          label="Telegram"
          value={userTelegram}
          onChange={setUserTelegram}
          placeholder="@example"
        />
        <InputTextRow
          label="VK"
          value={userVk}
          onChange={setUserVk}
          placeholder="@example"
        />
        <InputTextRow
          label="Сайт"
          value={userSite}
          onChange={setUserSite}
          placeholder="www.example.com"
        />
      </div>
      <div className={styles.form_block} style={{ marginBottom: "11px" }}>
        <InputTextRow
          label="Должность"
          value={userPost}
          onChange={setUserPost}
          placeholder="Например, руководитель"
        />
        <InputTextRow
          label="Опыт"
          value={userExpiriens}
          onChange={setUserExpiriens}
          placeholder="Укажите опыт в годах"
          type="number"
        />
        <SelectRow
          label="Статус"
          placeholder="Статус"
          value={userStatus}
          onChange={setUserStatus}
          options={workStatus}
        />
        <SelectRow
          label="Навыки"
          placeholder="Навыки"
          multiSelect
          value={userSkills}
          onMultiChange={setUserSkills}
          options={skills}
        />
        <SelectRow
          label="Теги"
          placeholder="Теги"
          value={tags}
          multiSelect
          onMultiChange={setTags}
          options={categoryTags()}
        />
      </div>
    </div>
  );
};
