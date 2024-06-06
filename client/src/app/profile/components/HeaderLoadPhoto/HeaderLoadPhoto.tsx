import styles from "./styles.module.scss";
import { useFileUpload } from "@/utils/hooks/useFileUpload";
import { useCallback, useEffect, useState } from "react";
import PhotoSVG from "@/assets/icons/photo.svg";

interface HeaderLoadPhotoProps {
  title: string;
  text: string;
}

export default function HeaderLoadPhoto({ title, text }: HeaderLoadPhotoProps) {
  const a = useFileUpload();

  const [accImage, setAccImage] = useState<string>();

  const handleAttachFile = useCallback(() => {
    a.openFilePicker();
  }, [a]);

  useEffect(() => {
    setAccImage(a.dataUrl);
  }, [a.dataUrl, accImage]);

  const handleReset = useCallback(() => {
    setAccImage((prev) => "");
    a.resetPhotoState();
  }, [a]);

  return (
    <div className={styles.container}>
      {!accImage && (
        <div className={styles.upload} onClick={handleAttachFile}>
          {a.inputComponent}
          <PhotoSVG />
        </div>
      )}
      <span className={styles.additional}>
        <span className={styles.title}>{title}</span>
        <span className={styles.text}>{text}</span>
      </span>
    </div>
  );
}
