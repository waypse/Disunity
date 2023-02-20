import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
