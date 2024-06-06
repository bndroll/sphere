import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { v4 as uuid4 } from "uuid";
import { upload } from "@/api/services/upload/upload.api";

const fileValidation = {
  accept: {
    "image/jpeg": [],
    "image/png": [],
    "image/jpg": [],
    "image/heic": [],
    "video/mp4": [],
    "video/m4v": [],
    "video/webm": [],
  },
};

const MAX_FILE_COUNT = 10;

export const useFileUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [dataUrl, setDataUrl] = useState("");
  const [fileDataURL, setFileDataURL] = useState<
    Array<{
      id: string;
      fileData: File;
      fileBlob: string;
    }>
  >([]);

  const ref = useRef<HTMLInputElement>(null);

  const openFilePicker = useCallback(() => {
    ref.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const files = e.target.files;
      setFiles(files);
    },
    [],
  );

  const handleRemovePhoto = useCallback(
    (id: string) => () => {
      setFileDataURL((prev) => prev.filter((el) => el.id !== id));
    },
    [],
  );

  const resetPhotoState = useCallback(() => {
    setFiles(null);
    setDataUrl("");
    setFileDataURL([]);
  }, []);

  const inputComponent = useMemo(() => {
    return (
      <input
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/heic"
        ref={ref}
      />
    );
  }, [handleFileChange]);

  useEffect(() => {
    let fileReader = new FileReader();
    let isCancel = false;

    const a = async () => {
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const fileReader = new FileReader();

          fileReader.onload = async (e) => {
            if (fileDataURL.length >= MAX_FILE_COUNT || i >= MAX_FILE_COUNT)
              return;

            const file = files[i];

            const url = await upload(file, "account-picture");

            setDataUrl(url);

            const result = {
              id: uuid4(),
              fileData: file,
              fileBlob: e.target?.result as string,
            };

            if (result && !isCancel) {
              setFileDataURL((prev) => {
                return [...prev, result];
              });
            }
          };

          const file = files[i];
          fileReader.readAsDataURL(file);
        }
      }

      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      };
    };

    void a();
  }, [files]);

  return {
    fileList: fileDataURL,
    dataUrl,
    inputComponent,
    openFilePicker,
    handleRemovePhoto,
    resetPhotoState,
  };
};
