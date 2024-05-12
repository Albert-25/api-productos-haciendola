import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequestDto {
  @IsNotEmpty()
  @IsString()
  userNameOrEmail: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
