"use client";
import { ProgressRegistry } from "@/app/registry/components/ProgressRegistry/ProgressRegistry";
import styles from "./page.module.scss";
import UserRegistryContextProvider from "@/utils/context/UserRegistryContext";
import { RegistrationView } from "@/app/registry/components/RegistrationView/RegistrationView";

export default function Registry() {
  return (
    <UserRegistryContextProvider>
      <div className={styles.main}>
        <RegistrationView />
        <ProgressRegistry />
      </div>
    </UserRegistryContextProvider>
  );
}
