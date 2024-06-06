import { useFileUpload } from "@/utils/hooks/useFileUpload";
import styles from "./styles.module.scss";
import { FC, useCallback, useEffect, useState } from "react";
import PhotoSVG from "@/assets/icons/photo.svg";
import Image from "next/image";

type Props = {
  onUpload: (url: string) => void;
  value?: string;
};
export const PhotoLoad: FC<Props> = ({ onUpload, value }) => {
  const a = useFileUpload();

  const [accImage, setAccImage] = useState<string>(value ?? "");

  const handleAttachFile = useCallback(() => {
    a.openFilePicker();
  }, [a]);

  useEffect(() => {
    if (value) setAccImage(value);
  }, [value]);

  useEffect(() => {
    setAccImage(a.dataUrl.length > 0 ? a.dataUrl : value ?? "");
    onUpload(a.dataUrl.length > 0 ? a.dataUrl : value ?? "");
  }, [value, a.dataUrl, accImage, onUpload]);

  const handleReset = useCallback(() => {
    setAccImage((prev) => "");
    onUpload("");
    a.resetPhotoState();
  }, [a, onUpload]);

  return (
    <div className={styles.wrapper}>
      {!value && !accImage && (
        <div className={styles.upload} onClick={handleAttachFile}>
          {a.inputComponent}
          <PhotoSVG />
        </div>
      )}
      {(value || accImage) && (
        <div className={styles.upload} onClick={handleReset}>
          <Image
            src={
              value
                ? `https://sphereapp.ru/api/account${value}`
                : `https://sphereapp.ru/api/account${accImage}`
            }
            alt="photo_account"
            width={210}
            height={140}
          />
        </div>
      )}
      <div className={styles.info}>
        <h1 className={styles.title}>Загрузить фото</h1>
        <div className={styles.texts}>
          <p className={styles.text}>
            Рекомендуем снимать портретное фото, сделанное при дневном свете
          </p>
          <p className={styles.text}>
            Важно, чтобы на нём было хорошо видно ваше лицо
          </p>
        </div>
      </div>
    </div>
  );
};
