"use client";
import HeaderLoadPhoto from "@/app/profile/components/HeaderLoadPhoto/HeaderLoadPhoto";
import styles from "./page.module.scss";
import { Button } from "@/ui/Button/Button";
import { useRouter } from "next/navigation";
import TabBar from "@/app/feed/components/TabBar/TabBar";
import { SelectRow } from "@/ui/SelectRow/SelectRow";
import { TextInput } from "@/ui/TextInput/TextInput";
import { useEffect } from "react";
import { vibrate } from "@/utils/hooks/vibration.helper";

export default function EditProfile() {
  const router = useRouter();

  useEffect(() => {
    vibrate();
  }, []);

  useEffect(() => {
    return () => {
      vibrate();
    };
  }, []);

  return (
    <div className={styles.container}>
      <HeaderLoadPhoto
        title="Загрузить фото"
        text="По умолчанию будет использоваться фото самой первой созданной анкеты"
        onUpload={() => {}}
      />
      <div className={styles.content}>
        <div className={styles.form}>
          <div className={styles.formItem}>
            <TextInput placeholder="Ваше имя" />
            <SelectRow label="Логин" />
            <SelectRow label="Пароль" />
          </div>
        </div>
        <div className={styles.btnWrap}>
          <Button
            text="Сохранить"
            onClick={() => console.log("")}
            variant="primary"
          />
          <Button
            text="Отмена"
            onClick={() => router.back()}
            variant="secondary"
            className={styles.btnText}
          />
        </div>
      </div>
      <TabBar tabs={[]} className={styles.tabBar} />
    </div>
  );
}
