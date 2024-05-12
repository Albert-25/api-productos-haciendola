import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordUtils } from '../utils/password-utils';
import { JwtService } from 'src/jwt/jwt.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async generateToken(user: User): Promise<string> {
    return await this.jwtService.generateToken(user);
  }

  async validateUser(userNameOrEmail: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserNameOrEmail(userNameOrEmail);
    const isPasswordValid = await PasswordUtils.comparePasswords(password, user.password)

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
