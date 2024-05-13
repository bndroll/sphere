import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  password?: string;

  @IsString()
  @MinLength(5)
  newPassword: string;
}
