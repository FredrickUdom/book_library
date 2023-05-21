import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signupDto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/signup')
    async signUp(@Body()payload:signUpDto): Promise<{token:string}>{
        return await this.authService.signUp(payload)
    }
}
