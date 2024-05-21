"use client";
import styles from "./styles.module.scss";
import { Button } from "@/ui/Button/Button";
import ArrowSVG from "@/assets/icons/Arrow.svg";
import React, { useCallback, useEffect, useState } from "react";
import useTelegramInitData from "@/utils/hooks/useTelegramInitData";
import LogoSvg from "@/assets/icons/logo.svg";
import CircleSvg from "@/assets/icons/circle.svg";
import { AnimatePresence, motion } from "framer-motion";
import { container, item } from "@/components/AuthView/AuthView.animation";
import { useRouter } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { postAuth } from "@/api/services/auth/auth.api";
import { Preload } from "@/components/Preload/Preload";
import Questionnaire from "@/app/feed/page";
import Registry from "@/app/registry/page";

export const AuthView = () => {
  const [isTelegram, setIsTelegram] = useState(false);
  const [isHasAuth, setIsHasAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();
  queryClient.clear();
  const initData = useTelegramInitData();
  useEffect(() => {
    const a = async () => {
      setLoading(true);
      if (initData?.user) {
        setIsTelegram(true);
        window.Telegram.WebApp.expand();
        const { accessToken, refreshToken } = await postAuth({
          telegramId: initData.user.id.toString(),
          username: initData.user.username ?? "",
        });
        localStorage.setItem("tcn", accessToken);
        localStorage.setItem("ref_tcn", refreshToken);
        setIsHasAuth(true);
        // const a = await findMe();
      } else setIsTelegram(false);
      setTimeout(() => setLoading(false), 2000);
    };
    void a();
  }, [initData]);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const textButton = useCallback(() => {
    return `Войти по @${initData?.user?.username ?? ""}`;
  }, [initData?.user?.username]);

  const clickHandler = () => {
    router.push("/registry");
  };

  const telegramWindow = () => {
    return (
      <motion.div
        layout
        className={styles.main}
        data-isopen={isOpen}
        initial={{ y: 10, opacity: 1 }}
      >
        <div className={styles.welcome}>
          <LogoSvg className={styles.logo} />
          <aside className={styles.rolers}>
            <span className={styles.circle}>
              <CircleSvg />
            </span>
            <span className={styles.circle}>
              <CircleSvg />
            </span>
            <span className={styles.circle}>
              <CircleSvg />
            </span>
          </aside>
          <motion.div variants={container} initial="hidden" animate="visible">
            <motion.h1 variants={item}>Добро пожаловать</motion.h1>
          </motion.div>
        </div>
        <Button
          text={textButton()}
          IconRight={ArrowSVG}
          justify="space-between"
          onClick={clickHandler}
        />
      </motion.div>
    );
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={isTelegram}>
          {loading ? (
            <Preload />
          ) : isTelegram ? (
            isHasAuth ? (
              <Questionnaire />
            ) : (
              telegramWindow()
            )
          ) : (
            <Registry />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
