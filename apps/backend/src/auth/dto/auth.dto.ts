import { IsString , IsEmail } from "class-validator";
export class CreateAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    organisationName: string;
}

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
