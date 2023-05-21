import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/schema.user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { signUpDto } from './dto/signupDto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private authModel:Model<User>, private jwtService: JwtService){}

    async signUp(signUpDto:signUpDto):Promise<{token:string}>{
        try {
            const{name, email, password} =signUpDto;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await this.authModel.create({
            name,
            email,
            password:hashedPassword
        });
        user.save()

        const token = this.jwtService.sign({id: user._id})
        return{token}
            
        } catch (error) {
            if(error.code == '11000')
            throw new BadRequestException('sorry email with the user already exist')
        }
        
    }
}
