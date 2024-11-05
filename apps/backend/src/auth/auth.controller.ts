import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createAuthDto: CreateAuthDto) {
    
    const user = await this.authService.findByEmail(createAuthDto.email);

    if(user){
      return {message: 'User already exists'};
    }
  }

}
