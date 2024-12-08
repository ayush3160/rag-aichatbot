import { Controller, Post, Body, Res, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserTokenPayload } from 'src/types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async create(@Body() createAuthDto: CreateAuthDto): Promise<{ message: string, token: string }> {

    const existingUser = await this.authService.findByEmail(createAuthDto.email);

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    createAuthDto.password = hashedPassword;

    const user = await this.authService.create(createAuthDto);

    const token = jwt.sign(<UserTokenPayload>{
      id: user.id,
      organisationName: user.organisationName
    }, process.env.JWT_SECRET);

    return { message: "User Created", token: token }
  }

  @Post('signin')
  async login(@Body() loginBody: LoginAuthDto): Promise<{ message: string, token: string }> {
    const user = await this.authService.findByEmail(loginBody.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const passwordMatch = await bcrypt.compare(loginBody.password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign({
      id: user.id,
      organisationName: user.organisationName
    }, process.env.JWT_SECRET);

    return { message: "Login successful", token: token }
  }

}
