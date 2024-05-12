import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
// import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtService {
    private readonly jwtSecret = 'prueba_tecnica_haciendola';

    //   constructor(private readonly configService: ConfigService) {}

    async generateToken(user: User): Promise<string> {
        return jwt.sign({ user }, this.jwtSecret, { expiresIn: '6h' });
    }

    async verifyToken(token: string): Promise<any> {
        // const jwtSecret = this.configService.get('JWT_SECRET');
        try {
            const payload = jwt.verify(token, this.jwtSecret);
            return payload;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}
