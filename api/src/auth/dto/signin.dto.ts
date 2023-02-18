import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  username: string;
}
