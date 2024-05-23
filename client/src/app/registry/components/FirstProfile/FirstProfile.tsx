import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "./styles.module.scss";
import { TextArea } from "@/ui/TextArea/TextArea";
import { InputTextRow } from "@/ui/InputTextRow/InputTextRow";
import { SwitchRow } from "@/ui/SwitchRow/SwitchRow";
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
  languages,
  skills,
  workStatus,
} from "@/app/registry/components/FirstProfile/first_profile.constants";
import { CategoryT } from "@/api/services/category/category.types";
import { createProfile } from "@/api/services/profile/profile.api";
import { Button } from "@/ui/Button/Button";

type Props = {
  categoryType: ProfilesT;
};
export const FirstProfile: FC<Props> = ({ categoryType }) => {
  const { categories, setSecondStep, user } =
    useContext<UserRegistryContextType>(UserRegistryContext);

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
  const [userAlcohol, setUserAlcohol] = useState("Мужской");
  const [userSmoking, setUserSmoking] = useState("");
  const [userPost, setUserPost] = useState("Мужской");
  const [userExpiriens, setUserExpiriens] = useState("");
  const [userSkills, setUserSkills] = useState(["Анализ данных"]);
  const [userStatus, setUserStatus] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setCategory(categories.get(categoryType));
  }, [categories, categoryType]);

  const categoryTags = useCallback(() => {
    return category?.tags.map((c) => c.title);
  }, [category]);

  const handleCreateProfile = async () => {
    const data: UserProfile = {
      categoryId: category?.id!,
      type: "User",
      visible: "Open",
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
          alcohol: userAlcohol,
          smoking: userSmoking,
        },
        work: {
          post: userPost,
          experience: userExpiriens,
          skills: userSkills,
          status: userStatus,
        },
        hobby: {
          hobbies: [],
        },
        open: true,
      },
    };
    try {
      const a = await createProfile(data);
    } catch (r) {
      alert(JSON.stringify(r));
    }
  };

  return (
    <div className={styles.wrapper}>
      <TopBanner
        title="Заполним вашу анкету"
        label="Создание профиля"
        titleClassname={styles.bannerTitle}
      />
      <Button text={"Create"} onClick={handleCreateProfile} />
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
        <SwitchRow label="Курение" className={styles.switch} />
        <SwitchRow label="Алкоголь" className={styles.switch} />
      </div>
      <div className={styles.form_block}>
        <InputTextRow label="Телефон" placeholder="+7(000)000-000-00" />
        <InputTextRow label="Telegram" placeholder="@example" />
        <InputTextRow label="VK" placeholder="@example" />
        <InputTextRow label="Сайт" placeholder="www.example.com" />
      </div>
      <div className={styles.form_block} style={{ marginBottom: "11px" }}>
        <InputTextRow label="Должность" placeholder="Например, руководитель" />
        <InputTextRow
          label="Опыт"
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
