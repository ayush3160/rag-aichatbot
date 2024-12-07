import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';

export class JwtMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        try {
            const secret = process.env.JWT_SECRET || 'your-secret-key';
            const decoded = jwt.verify(token, secret);
            req['user'] = decoded; // Attach decoded user info to request object
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}