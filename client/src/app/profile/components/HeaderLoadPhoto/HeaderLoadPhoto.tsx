import styles from "./styles.module.scss";
import { useFileUpload } from "@/utils/hooks/useFileUpload";
import { useCallback, useEffect, useState } from "react";
import PhotoSVG from "@/assets/icons/photo.svg";
import Image from "next/image";

interface HeaderLoadPhotoProps {
  title: string;
  text: string;
  value?: string;
  onUpload: (val: string) => void;
}

export default function HeaderLoadPhoto({
  title,
  text,
  value,
  onUpload,
}: HeaderLoadPhotoProps) {
  const a = useFileUpload();

  const [accImage, setAccImage] = useState<string>();

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
    <div className={styles.container}>
      {!value && (
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
            height={240}
          />
        </div>
      )}

      <span className={styles.additional}>
        <span className={styles.title}>{title}</span>
        {!(value || accImage) && <span className={styles.text}>{text}</span>}
      </span>
    </div>
  );
}
