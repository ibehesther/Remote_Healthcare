import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsStrongPassword, Matches, MaxDate, MinLength } from "class-validator";
import { Gender } from "src/enum/gender.enum";
import { Role } from "src/enum/role.enum";

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty({message: "First name cannot be empty"})
    first_name: string;

    @IsString()
    @IsOptional()
    middle_name: string;

    @IsString()
    @IsNotEmpty({message: "Last name cannot be empty"})
    last_name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[^\s]).{8,}$/, {
        message: "Password needs to be atleast 8 characters long, contain atleast one lowercase character, uppercase character, one number and one special character"
    })
    password: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @IsNotEmpty()
    @MaxDate(new Date(Date.now()), {
        message: `Date must be less than ${new Date(Date.now())}`
    })
    dob: Date;

    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber("NG", {
        message: "Phone number must start with country code i.e +234"
    })
    phone_number: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsEnum(Role)
    role: Role = Role.PATIENT;

    @IsString()
    @IsOptional()
    notes: string;
}