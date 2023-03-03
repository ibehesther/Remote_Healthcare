import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDTO } from "src/dto/create-user.dto";
import { SignInUserDTO } from "src/dto/signin-user.dto";

import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}


    @Post('signup')
    @UsePipes(new ValidationPipe())
    async createUser(@Body() user_data: CreateUserDTO) {
        user_data.dob = new Date(user_data.dob);

        const new_user = await this.authService.signUpUser(user_data);
        console.log("New user ", new_user)
        return new_user;
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signinUser(@Body()user_data: SignInUserDTO) {

        const user = await this.authService.signInUser(user_data);
        console.log(user)
        return user;
    }
}