import { useFileUpload } from "@/utils/hooks/useFileUpload";
import styles from "./styles.module.scss";
import { FC, useCallback, useEffect, useState } from "react";
import PhotoSVG from "@/assets/icons/photo.svg";
import Image from "next/image";

type Props = {
  onUpload: (url: string) => void;
};
export const PhotoLoad: FC<Props> = ({ onUpload }) => {
  const a = useFileUpload();

  const [accImage, setAccImage] = useState("");

  const handleAttachFile = useCallback(() => {
    a.openFilePicker();
  }, [a]);

  useEffect(() => {
    setAccImage(a.dataUrl);
    onUpload(accImage);
  }, [a.dataUrl]);

  const handleReset = useCallback(() => {
    setAccImage("");
    a.resetPhotoState();
  }, [a]);

  return (
    <div className={styles.wrapper}>
      {!accImage && (
        <div className={styles.upload} onClick={handleAttachFile}>
          {a.inputComponent}
          <PhotoSVG />
        </div>
      )}
      {accImage && (
        <div className={styles.upload} onClick={handleReset}>
          <Image
            src={`https://sphereapp.ru/api/account${accImage}`}
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
