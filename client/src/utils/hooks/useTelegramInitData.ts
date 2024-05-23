import { useEffect, useState } from "react";
import { WebAppInitData } from "@twa-dev/types";

function useTelegramInitData() {
  const [data, setData] = useState<WebAppInitData | null>();

  useEffect(() => {
    const firstLayerInitData = Object.fromEntries(
      new URLSearchParams(window.Telegram.WebApp.initData),
    );

    const initData: WebAppInitData = { auth_date: 0, hash: "" };

    for (const key in firstLayerInitData) {
      try {
        // @ts-ignore
        initData[key] = JSON.parse(firstLayerInitData[key]);
      } catch {
        // @ts-ignore
        initData[key] = firstLayerInitData[key];
      }
    }

    setData(initData);
  }, []);

  return data;
}

export default useTelegramInitData;
