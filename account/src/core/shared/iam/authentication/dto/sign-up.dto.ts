import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsOptional()
  telegramId?: number;
}
