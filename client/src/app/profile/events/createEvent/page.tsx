"use client";
import { Button } from "@/ui/Button/Button";
import { TextArea } from "@/ui/TextArea/TextArea";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileBg from "@/assets/images/profile_bg.png";
import { useCallback, useEffect, useState } from "react";
import "react-mobile-datepicker-ts/dist/main.css";
import cn from "classnames";
import DatePicker from "react-mobile-datepicker-ts/";
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
import { useScrollLock } from "@/utils/hooks/useScrollLock";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import { getCategories } from "@/api/services/category/category.api";
import { UserProfile } from "@/utils/context/UserRegistryContext";
import { CategoryT } from "@/api/services/category/category.types";
import { createProfile } from "@/api/services/profile/profile.api";
import { LoadEventPickture } from "@/app/profile/events/components/LoadEventPickture/LoadEventPickture";

const categories = ["Деловая", "Романтическая", "Досуговая"];

export default function CreateEvent() {
  const router = useRouter();
  const [username, setUserName] = useState<string | number>("");
  const { setScrollLock, removeScrollLock } = useScrollLock();
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

  const handleClick = () => {
    setIsOpen(true);
  };

  const data = useCallback(() => {
    return dayjs(time).locale("ru").format("DD  MMMM YYYY");
  }, [time]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSelect = useCallback(
    (time: Date) => {
      setTime(time);
      setIsOpen(false);
      removeScrollLock();
    },
    [removeScrollLock],
  );

  const handleFakeClick = () => {
    handleClick();
    setScrollLock();
  };

  useEffect(() => {
    const a = async () => {
      setSelectedTags([]);
      const categories = await getCategories();
      setCategories(categories);
      const currentTags = categories
        .find((tag) => tag.title === category)
        ?.tags.map((t) => t.title);
      setTags(currentTags ?? []);
    };

    void a();
  }, [category]);

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

    await createProfile(data);
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
            <SelectRow
              label="Категория"
              options={categories}
              value={category}
              onChange={setCategory}
            />
            <SwitchRow label="Закрытый" value={isClose} onChange={setIsClose} />
          </div>
        </div>
        <div className={cn(styles.form, styles.datePicker)}>
          <div
            className={cn(styles.fak, { [styles.fake]: !isOpen })}
            onScroll={handleFakeClick}
          >
            <div style={{ height: "500px" }} onScroll={handleFakeClick}></div>
          </div>
          <DatePicker
            isPopup={false}
            theme="ios"
            cancelText=""
            customHeader={
              <div className={styles.datePicker_header}>
                <span>Дата начала</span>
                <span>{data()}</span>
              </div>
            }
            value={time}
            isOpen={false}
            onSelect={handleSelect}
            onCancel={handleCancel}
          />
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
            text="Создать"
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
