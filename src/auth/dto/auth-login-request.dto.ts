import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequestDto {
  @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
  @IsString({ message: 'El usuario debe ser una cadena' })
  userNameOrEmail: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @IsString({ message: 'La contraseña debe ser una cadena' })
  password: string;
}
