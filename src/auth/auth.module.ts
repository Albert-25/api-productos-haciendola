import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
})
export class AuthModule { }
