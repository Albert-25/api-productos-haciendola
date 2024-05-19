import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequestDto } from './dto/auth-login-request.dto';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    try {
      const { userNameOrEmail, password } = loginDto;
      const user = await this.authService.validateUser(userNameOrEmail, password);

      const token = await this.authService.generateToken(user);

      return {
        success: true,
        token,
        message: 'Credenciales válidas'
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.response.message);
    }
  }
}
