import { IsDate, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Gender } from "src/enum/gender.enum";
import { Role } from "src/enum/role.enum";



export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    @MinLength(1, {message: "First name cannot be empty"})
    first_name: string;

    @IsString()
    @IsOptional()
    @MinLength(1, {message: "Middle name cannot be empty"})
    middle_name: string;

    @IsString()
    @IsOptional()
    @MinLength(1, {message: "Last name cannot be empty"})
    last_name: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsDate()
    @IsOptional()
    dob: Date;

    @IsEnum(Gender)
    @IsOptional()
    gender: Gender;

    @IsString()
    @IsOptional()
    @IsPhoneNumber("NG")
    phone_number: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsEnum(Role)
    @IsOptional()
    role: Role;

    @IsString()
    @IsOptional()
    notes: string;
}