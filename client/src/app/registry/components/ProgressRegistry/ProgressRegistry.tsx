import styles from "./styles.module.scss";
import { Button } from "@/ui/Button/Button";
import ArrowSVG from "@/assets/icons/Arrow.svg";
import React, { FC, useCallback, useContext } from "react";
import {
  UserRegistryContext,
  UserRegistryContextType,
} from "@/utils/context/UserRegistryContext";

export const ProgressRegistry: FC = () => {
  const { progress } = useContext<UserRegistryContextType>(UserRegistryContext);

  const percentBar = useCallback(() => {
    return progress.percent;
  }, [progress.percent]);

  const click = useCallback(() => {
    progress.onClickBtn();
  }, [progress]);

  if (progress.isHide) return <></>;

  return (
    <div className={styles.main}>
      <div className={styles.title_wrapper}>
        <p className={styles.title}>
          <span className={styles.step}>Этап </span>
          {progress.countSteps} из 3
        </p>
        <p className={styles.value}>{percentBar()}%</p>
      </div>
      <p className={styles.progressbar}>
        <span
          style={{ width: `${percentBar()}%` }}
          className={styles.progress}
        ></span>
      </p>
      <Button
        text="Следующий этап"
        IconRight={ArrowSVG}
        justify="space-between"
        disabled={progress.isAvailableNextPage}
        onClick={click}
      />
    </div>
  );
};
