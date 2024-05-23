import { useCallback, useEffect, useState } from "react";
import { CategoryT } from "@/api/services/category/category.types";
import { UserProfile } from "@/utils/context/UserRegistryContext";
import styles from "./styles.module.scss";
import { PhotoLoad } from "@/components/PhotoLoad/PhotoLoad";
import { TextArea } from "@/ui/TextArea/TextArea";
import { SelectRow } from "@/ui/SelectRow/SelectRow";
import {
  cities,
  education,
  hobbiesOptions,
  languages,
  skills,
  workStatus,
} from "@/app/registry/components/FirstProfile/first_profile.constants";
import { InputTextRow } from "@/ui/InputTextRow/InputTextRow";
import { SwitchRow } from "@/ui/SwitchRow/SwitchRow";
import {
  categoryMapper,
  UserMappingProfile,
} from "@/utils/context/UserStoreContext";
import { usePathname, useRouter } from "next/navigation";
import { getCategories } from "@/api/services/category/category.api";
import { findProfiles } from "@/api/services/profile/find-by-user.api";
import Image from "next/image";
import ProfileBg from "@/assets/images/profile_bg.png";
import { Button } from "@/ui/Button/Button";
import { updateProfile } from "@/api/services/profile/update-profile.api";

export const EditProfile = () => {
  const [profile, setProfile] = useState<UserMappingProfile>();
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
  const [username, setUsername] = useState("");
  const pathName = usePathname();

  useEffect(() => {
    const a = async () => {
      const cats = await getCategories();
      const account = await findProfiles();

      let profilies: UserMappingProfile[] = [];
      cats.forEach((category) => {
        account.map((profile) => {
          if (profile.categoryId === category.id) {
            // @ts-ignore
            profilies.push({
              ...profile,
              // @ts-ignore
              code: categoryMapper[category.title].type,
              // @ts-ignore
              name: categoryMapper[category.title].desc,
              // @ts-ignore
              icon: categoryMapper[category.title].icon,
            } as UserMappingProfile);
          }
        });
      });

      setCategory(cats.find((c) => c.id === pathName.split("/")[2]));

      setProfile(
        profilies.find(
          (profile) => profile.categoryId === pathName.split("/")[2],
        ),
      );
    };
    void a();
  }, []);

  useEffect(() => {
    if (profile) {
      setAbout(profile.info.about ?? "");
      setPickture(profile.info.picture ?? "");
      setCity(profile.info.city ?? "");
      setEducation(profile.info.education ?? "");
      setUserLanguage(profile.info.languages ?? []);
      setUserPhone(profile.info.contacts?.phone ?? "");
      setUserTelegram(profile.info.contacts?.telegram ?? "");
      setUserVk(profile.info.contacts?.vk ?? "");
      setUserSite(profile.info.contacts?.site ?? "");
      setUserGender(profile.info.dating?.gender ?? "");
      setUserHeight(profile.info.dating?.height ?? "");
      setUserAlcohol(profile.info.dating?.alcohol === "Да");
      setUserSmoking(profile.info.dating?.smoking === "Да");
      setUserPost(profile.info.work?.post ?? "");
      setUserExpiriens(profile.info.work?.experience ?? "");
      setUserSkills(profile.info.work?.skills ?? []);
      setUserStatus(profile.info.work?.status ?? "");
      setHobbies(profile.info.hobby?.hobbies ?? []);
      setUsername(profile.name ?? "");
      setTags(
        category?.tags
          // @ts-ignore
          .filter((c) => profile.tags?.includes(c.id))
          .map((c) => c.title) ?? [],
      );
    }
  }, [pathName, profile, category]);

  const categoryTags = useCallback(() => {
    return category?.tags.map((c) => c.title);
  }, [category]);

  const handleUpdateProfile = useCallback(async () => {
    const data: UserProfile = {
      categoryId: category?.id!,
      type: "User",
      visible: "Open",
      tagsId:
        category?.tags.filter((c) => tags.includes(c.title)).map((t) => t.id) ??
        [],
      info: {
        name: username,
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
      await updateProfile(data, profile!.id);
      router.push("/profile");
    } catch (r) {
      alert(r);
    }
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

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <div className={styles.wrapper}>
      <Image src={ProfileBg} className={styles.bg} alt="" />
      <div className={styles.header}>
        {profile?.icon} {profile?.name} анкета
      </div>
      <PhotoLoad onUpload={setPickture} value={pickture} />
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
        <SwitchRow
          label="Курение"
          value={userSmoking}
          onChange={setUserSmoking}
          className={styles.switch}
        />
        <SwitchRow
          label="Алкоголь"
          value={userAlcohol}
          onChange={setUserAlcohol}
          className={styles.switch}
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
      <div className={styles.form_block}>
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
      <div className={styles.actions}>
        <Button text="Сохранить" onClick={handleUpdateProfile} />
        <Button text="Назад" variant="secondary" onClick={handleCancel} />
      </div>
    </div>
  );
};
