import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
// import { ConfigModule } from '../config/config.module';

@Module({
//   imports: [ConfigModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
