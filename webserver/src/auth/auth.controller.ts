import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto) {        
        return await this.authService.createUser(dto);
    }
    @Post('login')
    async login(@Body() dto: AuthDto) {
        this.authService.login(dto);
    }
}