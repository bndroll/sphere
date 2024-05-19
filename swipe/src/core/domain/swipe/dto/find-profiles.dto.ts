export enum ProfileType {
  User = 'User',
  Event = 'Event',
}

export enum ProfileVisible {
  Open = 'Open',
  Close = 'Close',
}

export enum UserGender {
  Male = 'Male',
  Female = 'Female',
}

export class ProfileInfoContacts {
  phone?: string;
  email?: string;
  telegram?: string;
  vk?: string;
  site?: string;
  [key: string]: string;
}

export class ProfileInfoDating {
  gender: UserGender;
  height?: string;
  alcohol?: string;
  smoking?: string;
}

export class ProfileInfoWork {
  post?: string;
  experience?: string;
  skills?: string[];
  status?: string;
}

export class ProfileInfoHobby {
  hobbies?: string[];
}

export class ProfileInfo {
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
}

export class Category {
  id: string;
  title: string;
  createDate: Date;
}

export class Tag {
  id: string;
  title: string;
  categoryId: string;
  createDate: Date;
}

export class FindUserResponse {
  id: string;
  telegramId: string | null;
  username: string;
  phone: string | null;
  birthdayDate: Date | null;
  gender: UserGender | null;
  createDate: Date;
}

export class FindProfileRequest {
  id: string;
  type: ProfileType;
  info: ProfileInfo;
  visible: ProfileVisible;
  user: FindUserResponse;
  category: Category;
  tags: Tag[];
  createDate: Date;
  updatedDate: Date;
}

export class FindProfileDto {
  profileId: string;
}
