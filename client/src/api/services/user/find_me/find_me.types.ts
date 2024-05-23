export enum UserGender {
  Male = "Male",
  Female = "Female",
}

export type UserAccount = {
  gender: UserGender;
  id: string;
  telegramId: string | null;
  username: string;
  password: string | null;
  phone: string | null;
  birthdayDate: Date | null;
  profiles: [];
};
