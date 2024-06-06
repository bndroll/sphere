"use client";
import styles from "./styles.module.scss";
import { Button } from "@/ui/Button/Button";
import ArrowSVG from "@/assets/icons/Arrow.svg";
import React, { useCallback, useContext, useEffect, useState } from "react";
import useTelegramInitData from "@/utils/hooks/useTelegramInitData";
import LogoSvg from "@/assets/icons/logo.svg";
import CircleSvg from "@/assets/icons/circle.svg";
import { AnimatePresence, motion } from "framer-motion";
import { container, item } from "@/components/AuthView/AuthView.animation";
import { useRouter } from "next/navigation";
import { passwordAuth, postAuth } from "@/api/services/auth/auth.api";
import { Preload } from "@/components/Preload/Preload";
import cn from "classnames";
import { TextInput } from "@/ui/TextInput/TextInput";
import { findProfiles } from "@/api/services/profile/find-by-user.api";
import UserStoreContextProvider, {
  UserStoreContext,
} from "@/utils/context/UserStoreContext";
import { getCategories } from "@/api/services/category/category.api";
import TelegramSVG from "@/assets/icons/tg_icon.svg";
import { FeedPage } from "@/app/feed/components/FeedPage/FeedPage";
import { useTheme } from "@/utils/hooks/useTheme";

export const AuthView = () => {
  const [isTelegram, setIsTelegram] = useState(false);
  const [isHasAuth, setIsHasAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const initData = useTelegramInitData();
  const [login, setLogin] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  const { handleSetUserProfilies, setAllCategories } =
    useContext(UserStoreContext);

  useTheme();

  useEffect(() => {
    const a = async () => {
      setLoading(true);
      if (initData?.user) {
        setIsTelegram(true);
        window.Telegram.WebApp.expand();
        // @ts-ignore
        window.Telegram.WebApp.isClosingConfirmationEnabled = true;
        const { accessToken, refreshToken } = await postAuth({
          telegramId: initData.user.id.toString(),
          username: initData.user.username ?? "",
        });
        localStorage.setItem("tcn", accessToken);
        localStorage.setItem("ref_tcn", refreshToken);

        try {
          const account = await findProfiles();
          if (account.length > 0) {
            setIsHasAuth(true);
            const b = await getCategories();
            handleSetUserProfilies(account, b);
          }
        } catch (e) {
          setIsHasAuth(false);
        }
      } else setIsTelegram(false);
      setTimeout(() => setLoading(false), 2000);
    };
    void a();
  }, [handleSetUserProfilies, initData, isHasAuth]);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const authDisables = useCallback(() => {
    return login.toString().length < 2 || password.toString().length < 2;
  }, [login, password]);

  const textButton = useCallback(() => {
    return `Войти по @${initData?.user?.username ?? ""}`;
  }, [initData?.user?.username]);

  const clickHandler = () => {
    router.push("/registry");
  };

  const handleEnter = async () => {
    await passwordAuth(login, password);
  };

  const handleNavigateToTelegram = () => {
    return;
    // window.location.href = ''
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

  const defaultRegistry = () => {
    return (
      <motion.div
        layout
        className={styles.main}
        data-isopen={isOpen}
        initial={{ y: 10, opacity: 1 }}
      >
        <div className={cn(styles.welcome_default, styles.welcome)}>
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
        <div className={styles.auth_form}>
          <TextInput placeholder="Логин" value={login} onChange={setLogin} />
          <TextInput
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className={styles.other}>
          <Button
            text="Войти в аккаунт"
            onClick={handleEnter}
            // disabled={authDisables()}
          />
          <span className={styles.secondary_2}>Или</span>
          <Button
            text="Войти через Telegram"
            variant="secondary"
            IconLeft={TelegramSVG}
            onClick={handleNavigateToTelegram}
          />
          <span className={styles.registration}>
            <span className={styles.secondary}>Нет профиля?</span>
            <span className={styles.create}>Создайте его</span>
          </span>
        </div>
      </motion.div>
    );
  };

  const isFeed = () => {
    router.push("/feed");
    return <FeedPage />;
  };

  return (
    <>
      <UserStoreContextProvider>
        <AnimatePresence mode="wait">
          <motion.div key={isTelegram ? "1" : "0"}>
            {loading ? (
              <Preload />
            ) : isTelegram ? (
              isHasAuth ? (
                isFeed()
              ) : (
                telegramWindow()
              )
            ) : (
              defaultRegistry()
            )}
          </motion.div>
        </AnimatePresence>
      </UserStoreContextProvider>
    </>
  );
};
