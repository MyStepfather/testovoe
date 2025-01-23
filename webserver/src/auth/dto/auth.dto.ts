import { IsEmail, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string;
    @MinLength(8, {message: "Пароль должен содержать как минимум 8 символов"})
    password: string;
}