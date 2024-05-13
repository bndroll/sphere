import { IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  telegramId?: string;
}
