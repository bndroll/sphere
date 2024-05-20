"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProgressRegistry } from "@/app/registry/components/ProgressRegistry/ProgressRegistry";
import { UsefulCategory } from "@/app/registry/components/UsefulCategory/UsefulCategory";
import { FirstProfile } from "@/app/registry/components/FirstProfile/FirstProfile";
import { ProfileVisible } from "@/app/registry/components/ProfileVisible/ProfileVisible";
import styles from "./page.module.scss";

export default function Registry() {
  const [step, setStep] = useState(1);
  const [isAvailableNextPage, setIsAvailableNextPage] = useState(true);
  const [selectedTab, setSelectedTab] = useState(<UsefulCategory key={1} />);
  const handleSetDisabled = (val: boolean) => {
    setIsAvailableNextPage(val);
  };
  const steps = useMemo(
    () => [
      <UsefulCategory key={1} isAvailableNextPage={handleSetDisabled} />,
      <FirstProfile key={2} />,
      <ProfileVisible key={3} />,
    ],
    [],
  );

  useEffect(() => {
    return () => {
      setSelectedTab(steps[0]);
    };
  }, [steps]);

  const handleNextStep = useCallback(() => {
    if (step > steps.length - 1) {
      setStep(1);
      setSelectedTab(steps[0]);
      return;
    }
    setIsAvailableNextPage(true);
    setStep((prev) => prev + 1);
    setSelectedTab(steps[step]);
  }, [step, steps]);

  return (
    <div className={styles.main}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTab}
        </motion.div>
      </AnimatePresence>
      <ProgressRegistry
        onNextClick={() => handleNextStep()}
        step={step}
        isDisabled={isAvailableNextPage}
      />
    </div>
  );
}
