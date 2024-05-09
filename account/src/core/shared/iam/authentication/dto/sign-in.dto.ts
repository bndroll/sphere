import { IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(5)
  password: string;
}
