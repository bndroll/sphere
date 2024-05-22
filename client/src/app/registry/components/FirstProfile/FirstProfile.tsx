import { TopBanner } from "@/app/registry/components/_components/TopBanner/TopBanner";
import styles from "./styles.module.scss";
import { TextArea } from "@/ui/TextArea/TextArea";
import { InputTextRow } from "@/ui/InputTextRow/InputTextRow";
import { SwitchRow } from "@/ui/SwitchRow/SwitchRow";
import { SelectRow } from "@/ui/SelectRow/SelectRow";
import { FC, useContext, useEffect, useState } from "react";
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
  const [userEducation, setEducation] = useState("");
  const [userLanguage, setUserLanguage] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userTelegram, setUserTelegram] = useState("");
  const [userVk, setUserVk] = useState("");
  const [userSite, setUserSite] = useState("");
  const [userGender, setUserGender] = useState("Male");
  const [userHeight, setUserHeight] = useState("");
  const [userAlcohol, setUserAlcohol] = useState("Male");
  const [userSmoking, setUserSmoking] = useState("");
  const [userPost, setUserPost] = useState("Male");
  const [userExpiriens, setUserExpiriens] = useState("");
  const [userSkills, setUserSkills] = useState("Male");
  const [userStatus, setUserStatus] = useState("");
  const [hobbies, setHobbies] = useState("");

  useEffect(() => {
    setCategory(categories.get(categoryType));
  }, [categories, categoryType]);

  const handleCreateProfile = async () => {
    const data: UserProfile = {
      categoryId: category?.id!,
      type: "User",
      visible: "Open",
      tagsId: category!.tags.map((c) => c.id) ?? [],
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
          gender: "Male",
          height: userHeight,
          alcohol: userAlcohol,
          smoking: userSmoking,
        },
        work: {
          post: userPost,
          experience: userExpiriens,
          skills: [userSkills],
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
          onChange={setUserLanguage}
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
        <InputTextRow label="Email" placeholder="example@example.com" />
        <InputTextRow label="Telegram" placeholder="@example" />
        <InputTextRow label="VK" placeholder="@example" />
        <InputTextRow label="Сайт" placeholder="www.example.com" />
      </div>
      <div className={styles.form_block} style={{ marginBottom: "11px" }}>
        <InputTextRow label="Должность" placeholder="Например, руководитель" />
        <InputTextRow label="Опыт" placeholder="Укажите опыт в годах" />
        <SelectRow label="Статус" placeholder="Статус" options={workStatus} />
        <SelectRow label="Навыки" placeholder="Навыки" options={skills} />
      </div>
    </div>
  );
};
