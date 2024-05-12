import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token no proporcionado');
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = await this.jwtService.verifyToken(token);
            const { user } = payload

            req['user'] = user;
            next();
        } catch (err) {
            throw new UnauthorizedException('Token inválido');
        }
    }
}
