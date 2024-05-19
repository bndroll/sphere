import styles from "./styles.module.scss";
import { Button } from "@/ui/Button/Button";
import ArrowSVG from "@/assets/icons/Arrow.svg";
import React, { FC, useCallback } from "react";

type Props = {
  step: number;
  onNextClick: () => void;
};
export const ProgressRegistry: FC<Props> = ({ onNextClick, step }) => {
  const procentBar = useCallback(() => {
    const width = [0, 22, 80, 90];
    return width[step];
  }, [step]);
  return (
    <div className={styles.main}>
      <div className={styles.title_wrapper}>
        <p className={styles.title}>
          <span className={styles.step}>Этап </span>
          {step} из 3
        </p>
        <p className={styles.value}>{procentBar()}%</p>
      </div>
      <p className={styles.progressbar}>
        <span
          style={{ width: `${procentBar()}%` }}
          className={styles.progress}
        ></span>
      </p>
      <Button
        text="Следующий этап"
        IconRight={ArrowSVG}
        justify="space-between"
        onClick={onNextClick}
      />
    </div>
  );
};
