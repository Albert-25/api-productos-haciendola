import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El usuario no puede estar vacío' })
  @IsString({ message: 'El usuario debe ser una cadena' })
  @MinLength(3, { message: 'El usuario debe contener al menos 3 caracteres' })
  userName: string;

  @IsNotEmpty({ message: 'El correo no puede estar vacío' })
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  @MinLength(3, { message: 'La contraseña debe contener al menos 3 caracteres' })
  password: string;
}
