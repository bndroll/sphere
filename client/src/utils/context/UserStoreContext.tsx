import { createContext, ReactNode, useState } from "react";
import { ProfilesT, UserProfile } from "@/utils/context/UserRegistryContext";
import { CategoryT } from "@/api/services/category/category.types";

type UserStoreContextType = {
  user: UserInfo;
  categories: Map<ProfilesT, CategoryT>;
  usersProfilies: UserProfile[];
  handleSetUserProfilies: (val: UserProfile[]) => void;
  setAllCategories: (cat: CategoryT[]) => void;
};
type UserInfo = {};
const defaultUser = {};
const defaultUserProfilies: UserProfile[] = [];

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
    useState<UserProfile[]>(defaultUserProfilies);

  const handleSetUserProfilies = (val: UserProfile[]) => {
    setUserProfilies(val);
  };

  const setAllCategories = (cat: CategoryT[]) => {
    cat.forEach((c) => {
      // @ts-ignore
      const category = categoryMapper[c.title];
      categories.set(category.type, c);
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
