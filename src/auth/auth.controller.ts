import { Body, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { CreateUserDTO, SignInUserDTO } from "src/dto/user.dto";
import { AuthService } from "./auth.service";
import { CreateUserValidationPipe, SignInUserValidationPipe } from "./authValidation.pipe";


@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    
    @Post('signup')
    @UsePipes(new CreateUserValidationPipe())
    async createUser(@Body() user_data: CreateUserDTO) {
        user_data.dob = new Date(user_data.dob);
        
        const new_user = await this.authService.signUpUser(user_data);
        console.log("New user ", new_user)
        return new_user;
    }

    @Post('signin')
    @HttpCode(200)
    @UsePipes(new SignInUserValidationPipe())
    async signinUser(@Body()user_data: SignInUserDTO) {

        const user = await this.authService.signInUser(user_data);
        console.log(user)
        return user;
    }
}