import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class loginDto{
    @IsEmail({},{message: 'please enter a valid email address'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password must contain atleast one upperCase, one number and special character'})
    readonly password: string;
}