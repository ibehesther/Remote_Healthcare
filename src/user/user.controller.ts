import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UsePipes } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDTO } from "../dto/user.dto";
import { User } from "./user.entity";
import { CreateUserValidationPipe } from "./validation.pipe";

@Controller("users")

export class userController{
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers (){
        return this.userService.findAll();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }

    @Post()
    @UsePipes(new CreateUserValidationPipe())
    async createUser(@Body(new CreateUserValidationPipe()) user_data: CreateUserDTO) {
        user_data.dob = new Date(user_data.dob);
        
        const new_user = this.userService.createUser(user_data);
        return new_user;
    }

    @Patch(':id')
    async updateUser() {

    }
}
