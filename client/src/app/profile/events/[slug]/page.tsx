"use client";
import { Button } from "@/ui/Button/Button";
import { TextArea } from "@/ui/TextArea/TextArea";
import styles from "./page.module.scss";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import ProfileBg from "@/assets/images/profile_bg.png";
import { useCallback, useEffect, useState } from "react";
import "react-mobile-datepicker-ts/dist/main.css";
import Transition from "@/components/Transition/Transition";
import { SelectRow } from "@/ui/SelectRow/SelectRow";
import { InputTextRow } from "@/ui/InputTextRow/InputTextRow";
import { SwitchRow } from "@/ui/SwitchRow/SwitchRow";
import {
  cities,
  languages,
} from "@/app/registry/components/FirstProfile/first_profile.constants";
import HeaderLoadPhoto from "@/app/profile/components/HeaderLoadPhoto/HeaderLoadPhoto";
import { TextInput } from "@/ui/TextInput/TextInput";
import "dayjs/locale/ru";
import { getCategories } from "@/api/services/category/category.api";
import { UserProfile } from "@/utils/context/UserRegistryContext";
import { CategoryT } from "@/api/services/category/category.types";
import { LoadEventPickture } from "@/app/profile/events/components/LoadEventPickture/LoadEventPickture";
import {
  categoryMapper,
  UserMappingProfile,
} from "@/utils/context/UserStoreContext";
import { vibrate } from "@/utils/hooks/vibration.helper";
import { findProfiles } from "@/api/services/profile/find-by-user.api";
import { updateProfile } from "@/api/services/profile/update-profile.api";

const categories = ["Деловая", "Романтическая", "Досуговая"];

export default function UpdateEventSlug() {
  const router = useRouter();
  const [username, setUserName] = useState<string | number>("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [eventLanguages, setLanguages] = useState<string[]>([]);
  const [isClose, setIsClose] = useState(false);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [vk, setVk] = useState("");
  const [site, setSite] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [icon, setIcon] = useState("");
  const [pickture, setPicture] = useState("");
  const [allCategories, setCategories] = useState<CategoryT[]>([]);
  const [time, setTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserMappingProfile>();
  const pathName = usePathname();
  const [initialCategory, setInitialCategory] = useState<
    UserMappingProfile | undefined
  >();

  useEffect(() => {
    if (profile) {
      setDescription(profile.info.about ?? "");
      setPicture(profile.info.picture ?? "");
      setCity(profile.info.city ?? "");
      setLanguages(profile.info.languages ?? []);
      setEmail(profile.info.contacts?.email ?? "");
      setPhone(profile.info.contacts?.phone ?? "");
      setTelegram(profile.info.contacts?.telegram ?? "");
      setVk(profile.info.contacts?.vk ?? "");
      setSite(profile.info.contacts?.site ?? "");
      setUserName(profile.info.name ?? "");
      setIcon(profile.info.avatarPicture ?? "");
      setIsClose(profile.visible === "Open");
    }
  }, [pathName, profile, profile?.info, category]);

  useEffect(() => {
    vibrate();
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

      setProfile(
        profilies.find((profile) => profile.id === pathName.split("/")[3]),
      );
      const category = profilies.find(
        (profile) => profile.id === pathName.split("/")[3],
      );
      setInitialCategory(category);

      setCategory(category?.name ?? "");
    };
    void a();
  }, []);

  useEffect(() => {
    const a = async () => {
      setSelectedTags([]);
      const categories = await getCategories();
      setCategories(categories);
      const currentTags = categories
        .find((tag) => tag.title === category)
        ?.tags.map((t) => t.title);
      setTags(currentTags ?? []);

      const selected = categories
        .filter((c) => !profile?.tags?.includes(c.id))[0]
        .tags.map((c) => c.title);
      setSelectedTags(selected);
    };

    void a();
  }, [category, profile]);

  const handleCreateEvent = useCallback(async () => {
    const currentCategory = allCategories.find((cat) => cat.title === category);
    if (!currentCategory) return;
    const data: UserProfile = {
      categoryId: currentCategory.id,
      visible: isClose ? "Close" : "Open",
      type: "Event",
      tagsId:
        currentCategory?.tags
          .filter((c) => tags.includes(c.title))
          .map((t) => t.id) ?? [],
      info: {
        name: username.toString(),
        about: description,
        avatarPicture: icon,
        picture: pickture,
        city: city,
        startDate: time,
        languages: eventLanguages,
        contacts: {
          phone: phone,
          email: email,
          telegram: telegram,
          vk: vk,
          site: site,
        },
      },
    };

    await updateProfile(data, profile!.id);
    router.push("/profile/events");
  }, [
    router,
    allCategories,
    category,
    city,
    description,
    email,
    eventLanguages,
    icon,
    isClose,
    phone,
    pickture,
    profile,
    site,
    tags,
    telegram,
    time,
    username,
    vk,
  ]);

  return (
    <Transition>
      <div className={styles.container}>
        <Image
          src={ProfileBg}
          quality={100}
          width={430}
          height={170}
          className={styles.bg}
          alt=""
        />
        <HeaderLoadPhoto
          title="Загрузить логотип"
          text="Рекомендуем загружать квадратное фото"
          value={icon}
          onUpload={setIcon}
        />
        <TextInput
          placeholder="Имя организатора эвента"
          value={username}
          onChange={setUserName}
        />
        <LoadEventPickture value={pickture} onUpload={setPicture} />
        <TextArea
          placeholder="Название мероприятия"
          value={description}
          onChange={setDescription}
        />
        <div className={styles.form}>
          <div className={styles.formItem}>
            <SelectRow
              label="Город"
              options={cities}
              value={city}
              onChange={setCity}
            />
            <SelectRow
              label="Языки"
              options={languages}
              value={eventLanguages}
              multiSelect={true}
              onMultiChange={setLanguages}
            />
            <SwitchRow label="Закрытый" value={isClose} onChange={setIsClose} />
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <InputTextRow
              label="Телефон"
              placeholder="+7(000)000-00-00"
              value={phone}
              onChange={setPhone}
            />
            <InputTextRow
              label="Email"
              placeholder="example@example.com"
              value={email}
              onChange={setEmail}
            />
            <InputTextRow
              label="Telegram"
              placeholder="@example"
              value={telegram}
              onChange={setTelegram}
            />
            <InputTextRow
              label="VK"
              placeholder="@example"
              value={vk}
              onChange={setVk}
            />
            <InputTextRow
              label="Сайт"
              placeholder="www.example.com"
              value={site}
              onChange={setSite}
            />
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <SelectRow
              label="Теги"
              value={selectedTags}
              options={tags}
              multiSelect
              onMultiChange={setSelectedTags}
            />
          </div>
        </div>
        <Button
          text="Как мой эвент будут видеть другие?"
          onClick={() => console.log("")}
          className={styles.customBtn}
          variant="secondary"
          justify="start"
        />
        <div className={styles.btnWrap}>
          <Button
            text="Сохранить"
            onClick={handleCreateEvent}
            variant="primary"
          />
          <Button
            text="Отмена"
            onClick={() => router.push("/profile/events")}
            variant="secondary"
            className={styles.whiteText}
          />
        </div>
      </div>
    </Transition>
  );
}
