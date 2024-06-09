import styles from "./styles.module.scss";
import { useFileUpload } from "@/utils/hooks/useFileUpload";
import { FC, useCallback, useEffect, useState } from "react";
import PlusSvg from "@/assets/icons/add.svg";
import Image from "next/image";

interface HeaderLoadPhotoProps {
  value?: string;
  onUpload: (val: string) => void;
}

export const LoadEventPickture: FC<HeaderLoadPhotoProps> = ({
  value,
  onUpload,
}) => {
  const a = useFileUpload();

  const [accImage, setAccImage] = useState<string>();

  const handleAttachFile = useCallback(() => {
    a.openFilePicker();
  }, [a]);

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
    <div className={styles.card} onClick={handleAttachFile}>
      {!value && (
        <>
          <label className={styles.btnPlus}>
            {a.inputComponent}
            <PlusSvg />
          </label>
          <span className={styles.cardName}>Обложка мероприятия</span>
          <span className={styles.cardText}>
            Рекомендуем вертикальные светлые фотографии в хорошем качестве,
            передающие атмосферу мероприятия.
          </span>
        </>
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
            height={240}
          />
        </div>
      )}
    </div>
  );
};
