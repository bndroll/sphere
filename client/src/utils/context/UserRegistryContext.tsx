"use client";

import { createContext, ReactNode, useState } from "react";
import { UsefulCategory } from "@/app/registry/components/UsefulCategory/UsefulCategory";
import BusinessSVG from "@/assets/images/buisness.svg";
import DateSVG from "@/assets/images/date.svg";
import HobbiesSVG from "@/assets/images/hobbie.svg";
import { CategoryT } from "@/api/services/category/category.types";

export type ProfilesT = "network" | "dating" | "hobbies";
export type Profile = {
  title: string;
  type: ProfilesT;
  icon?: ReactNode;
  isUpdated?: boolean;
};

export type UserGender = "Male" | "Female";

export type ProfileInfoContacts = {
  phone: string;
  email: string;
  telegram: string;
  vk: string;
  site: string;
  [key: string]: string;
};

export type ProfileInfoDating = {
  gender: UserGender;
  height?: string;
  alcohol?: string;
  smoking?: string;
};

export type ProfileInfoWork = {
  post?: string;
  experience?: string;
  skills?: string[];
  status?: string;
};

export type ProfileInfoHobby = {
  hobbies?: string[];
};

export type ProfileInfo = {
  name: string;
  about?: string;
  picture?: string;
  city?: string;
  education?: string;
  languages?: string[];
  contacts?: ProfileInfoContacts;
  dating?: ProfileInfoDating;
  work?: ProfileInfoWork;
  hobby?: ProfileInfoHobby;

  open?: boolean;
  startDate?: Date;
  endDate?: Date;
};

export type UserProfile = {
  id?: string;
  categoryId: string;
  tagsId: string[];
  type: "User";
  visible?: "Open" | "Close";
  info: ProfileInfo;
};

const defaultUser = {
  username: "",
  enablesProfiles: [],
  profiles: [],
  currentProfileData: null,
};

const defaultProgress: ProgressRegistry = {
  percent: 10,
  countSteps: 1,
  step: <UsefulCategory />,
  isAvailableNextPage: false,
  isHide: false,
  isLast: false,
  onClickBtn: () => {},
};

const defaultValue: UserRegistryContextType = {
  user: defaultUser,
  progress: defaultProgress,
  categories: new Map(),
  setAllCategories: ([]) => {},
  setFirstStep: (username: string, enablesProfiles: string[]) => {},
  setHideProgress: (isHide: boolean) => {},
  setStepProgress: (step: ReactNode) => {},
  setIsAvailableNextPageProgress: (val: boolean) => {},
  setIsLast: (val: boolean) => {},
  setPercent: (val: number) => {},
  setProgressOnClick: (onCLick: () => void) => {},
  setCountStep: (val: number) => {},
  setSecondStep: (data: UserProfile) => {},
  setEnabledProfile: (val: ProfilesT) => {},
};

const profileMapper = {
  network: {
    title: "Деловые знакомства",
    type: "network",
    icon: <BusinessSVG />,
    isUpdated: false,
  },
  dating: {
    title: "Романтические отношения",
    type: "dating",
    icon: <DateSVG />,
    isUpdated: false,
  },
  hobbies: {
    title: "Приятный досуг",
    type: "hobbies",
    icon: <HobbiesSVG />,
    isUpdated: false,
  },
};

export const categoryMapper = {
  Деловая: {
    type: "network",
    icon: <BusinessSVG />,
  },
  Романтическая: {
    type: "dating",
    icon: <DateSVG />,
  },
  Досуговая: {
    type: "hobbies",
    icon: <HobbiesSVG />,
  },
};
export type UserRegistryForm = {
  username: string;
  enablesProfiles: Profile[];
  profiles: UserProfile[];
  currentProfileData: UserProfile | null;
};

export type ProgressRegistry = {
  percent: number;
  step: ReactNode;
  countSteps: number;
  isAvailableNextPage: boolean;
  isHide: boolean;
  isLast: boolean;
  onClickBtn: () => void;
};

export type UserRegistryContextType = {
  user: UserRegistryForm;
  progress: ProgressRegistry;
  categories: Map<ProfilesT, CategoryT>;
  setFirstStep: (username: string, enablesProfiles: ProfilesT[]) => void;
  setHideProgress: (isHide: boolean) => void;
  setStepProgress: (step: ReactNode) => void;
  setIsAvailableNextPageProgress: (val: boolean) => void;
  setIsLast: (val: boolean) => void;
  setPercent: (val: number) => void;
  setProgressOnClick: (click: () => void) => void;
  setCountStep: (val: number) => void;
  setAllCategories: (val: CategoryT[]) => void;
  setSecondStep: (data: UserProfile) => void;
  setEnabledProfile: (val: ProfilesT) => void;
};

export const UserRegistryContext =
  createContext<UserRegistryContextType>(defaultValue);
export default function UserRegistryContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserRegistryForm>(defaultUser);
  const [progress, setProgress] = useState<ProgressRegistry>(defaultProgress);
  const [categories, setCategories] = useState<Map<ProfilesT, CategoryT>>(
    new Map(),
  );
  const setFirstStep = (username: string, enablesProfiles: ProfilesT[]) => {
    // @ts-ignore
    setUser((prev) => ({
      ...prev,
      username: username,
      enablesProfiles: enablesProfiles.map((p) => profileMapper[p]),
    }));
  };

  const setHideProgress = (isHide: boolean) => {
    setProgress((prev) => ({ ...prev, isHide: isHide }));
  };

  const setStepProgress = (step: ReactNode) => {
    setProgress((prev) => ({ ...prev, step: step }));
  };

  const setIsAvailableNextPageProgress = (isAvailable: boolean) => {
    setProgress((prev) => ({ ...prev, isAvailableNextPage: isAvailable }));
  };

  const setIsLast = (val: boolean) => {
    setProgress((prev) => ({ ...prev, isLast: val }));
  };

  const setPercent = (val: number) => {
    setProgress((prev) => ({ ...prev, percent: val }));
  };

  const setProgressOnClick = (click: () => void) => {
    setProgress((prevState) => ({ ...prevState, onClickBtn: click }));
  };

  const setCountStep = (val: number) => {
    setProgress((prev) => ({ ...prev, countSteps: val }));
  };

  const setProfile = (data: UserProfile) => {
    setUser((prev) => ({ ...prev, profiles: [...prev.profiles, data] }));
  };

  const setAllCategories = (cat: CategoryT[]) => {
    cat.forEach((c) => {
      // @ts-ignore
      const category = categoryMapper[c.title];
      categories.set(category.type, c);
    });
  };

  const setSecondStep = (data: UserProfile) => {
    setUser((prev) => ({ ...prev, currentProfileData: data }));
  };

  const setEnabledProfile = (profile: ProfilesT) => {
    setUser((prev) => ({
      ...prev,
      enablesProfiles: prev.enablesProfiles.map((prof) => {
        if (prof.type === profile) {
          return {
            ...prof,
            isUpdated: true,
          };
        }
        return prof;
      }),
    }));
  };

  return (
    <UserRegistryContext.Provider
      value={{
        user,
        progress,
        categories,
        setFirstStep,
        setHideProgress,
        setStepProgress,
        setIsAvailableNextPageProgress,
        setIsLast,
        setPercent,
        setProgressOnClick,
        setCountStep,
        setAllCategories,
        setSecondStep,
        setEnabledProfile,
      }}
    >
      {children}
    </UserRegistryContext.Provider>
  );
}
