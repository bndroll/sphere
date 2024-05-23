"use client";
import { createContext, ReactNode, useState } from "react";
import {
  ProfileInfo,
  ProfilesT,
  UserProfile,
} from "@/utils/context/UserRegistryContext";
import { CategoryT } from "@/api/services/category/category.types";
import BusinessSVG from "@/assets/images/buisness.svg";
import DateSVG from "@/assets/images/date.svg";
import HobbiesSVG from "@/assets/images/hobbie.svg";

export const categoryMapper = {
  Деловая: {
    type: "network",
    desc: "Деловая",
    icon: <BusinessSVG />,
  },
  Романтическая: {
    type: "dating",
    desc: "Романтическая",
    icon: <DateSVG />,
  },
  Досуговая: {
    type: "hobbies",
    desc: "Досуговая",
    icon: <HobbiesSVG />,
  },
};

export type UserMappingProfile = {
  categoryId: string;
  tagsId: string[];
  type: "User";
  id: string;
  visible: "Open" | "Close";
  info: ProfileInfo;
  name: string;
  icon: ReactNode;
  code: string;
};

type UserStoreContextType = {
  user: UserInfo;
  categories: Map<ProfilesT, CategoryT>;
  usersProfilies: UserMappingProfile[];
  handleSetUserProfilies: (val: UserProfile[], cat: CategoryT[]) => void;
  setAllCategories: (cat: CategoryT[]) => void;
};
type UserInfo = {};
const defaultUser = {};
const defaultUserProfilies: UserMappingProfile[] = [];

const defaultValue = {
  user: defaultUser,
  categories: new Map(),
  usersProfilies: [],
  handleSetUserProfilies: () => {},
  setAllCategories: () => {},
};

export const UserStoreContext =
  createContext<UserStoreContextType>(defaultValue);
export default function UserStoreContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UserInfo>(defaultUser);
  const [categories, setCategories] = useState<Map<ProfilesT, CategoryT>>(
    new Map(),
  );
  const [usersProfilies, setUserProfilies] =
    useState<UserMappingProfile[]>(defaultUserProfilies);

  const handleSEtUser = (user: UserInfo) => {
    setUser(user);
  };

  const handleSetUserProfilies = (val: UserProfile[], cats: CategoryT[]) => {
    let a: UserMappingProfile[] = [];
    cats.forEach((category) => {
      val.map((profile) => {
        if (profile.categoryId === category.id) {
          // @ts-ignore
          a.push({
            ...profile,
            // @ts-ignore
            code: categoryMapper[category.title].type,
            // @ts-ignore
            name: categoryMapper[category.title].desc,
            // @ts-ignore
            icon: categoryMapper[category.title].icon,
          } as UserMappingProfile);
        }
      });
    });
    setUserProfilies(a);
  };

  const setAllCategories = (cat: CategoryT[]) => {
    cat.forEach((c) => {
      // @ts-ignore
      const category = categoryMapper[c.title];

      categories.set(category.type, {
        ...c,
        desc: category.desc,
        icon: category.icon,
      });
    });
  };
  return (
    <UserStoreContext.Provider
      value={{
        user,
        usersProfilies,
        categories,
        handleSetUserProfilies,
        setAllCategories,
      }}
    >
      {children}
    </UserStoreContext.Provider>
  );
}
