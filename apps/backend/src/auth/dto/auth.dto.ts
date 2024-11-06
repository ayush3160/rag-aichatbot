import { IsString , IsEmail } from "class-validator";
export class CreateAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
