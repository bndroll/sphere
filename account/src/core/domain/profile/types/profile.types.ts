import { UserGender } from 'src/core/domain/user/entities/user.entity';

export enum ProfileType {
  User = 'User',
  Event = 'Event',
}

export enum ProfileVisible {
  Open = 'Open',
  Close = 'Close',
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

  startDate?: Date;
  endDate?: Date;
}
