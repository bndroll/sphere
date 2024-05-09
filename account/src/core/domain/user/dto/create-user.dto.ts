export class CreateUserDto {
  name: string;
  telegramId: number | null;
  password: string | null;
}

export class CreateUserEntityDto {
  name: string;
  telegramId: number | null;
  password: string | null;
}
