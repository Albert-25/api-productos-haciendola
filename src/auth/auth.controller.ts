import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginRequestDto } from './dto/auth-login-request.dto';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {

    const { userNameOrEmail, password } = loginDto;
    const user = await this.authService.validateUser(userNameOrEmail, password);

    if (!user) {
      return {
        success: false,
        token: '',
        message: 'Credenciales inválidas'
      };
    }

    const token = await this.authService.generateToken(user);

    return {
      success: true,
      token,
      message: 'Crendiales válidas'
    };
  }
}
