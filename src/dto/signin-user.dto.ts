import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";


export class SignInUserDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[^\s]).{8,}$/, {
        message: "Password needs to be atleast 8 characters long, contain atleast one lowercase character, uppercase character, one number and one special character"
    })
    password: string;
}