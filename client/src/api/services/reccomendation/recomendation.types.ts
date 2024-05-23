import { ProfileInfo } from "@/utils/context/UserRegistryContext";
import { UserAccount } from "@/api/services/user/find_me/find_me.types";

export type ProfileCardType = {
  category: any;
  createDate: Date;
  id: string;
  info: ProfileInfo;
  tags: TagT[];
  type: "string";
  updatedDate: Date;
  user: UserAccount;
  visible: string;
};

export type TagT = {
  category: {
    createDate: string;
    id: string;
    title: string;
  };
  createDate: Date;
  id: string;
  title: string;
};
