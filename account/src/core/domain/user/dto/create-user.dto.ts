export class CreateUserDto {
  username: string;
  telegramId: string | null;
  password: string | null;
}

export class CreateUserEntityDto {
  username: string;
  telegramId: string | null;
  password: string | null;
}
