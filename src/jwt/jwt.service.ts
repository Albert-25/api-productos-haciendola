import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtService {
    private readonly jwtSecret = 'prueba_tecnica_haciendola';

    async generateToken(user: User): Promise<string> {
        return jwt.sign({ user }, this.jwtSecret, { expiresIn: '6h' });
    }

    async verifyToken(token: string): Promise<any> {

        try {
            const payload = jwt.verify(token, this.jwtSecret);
            return payload;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}
