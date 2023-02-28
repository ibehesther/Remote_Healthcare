import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UpdateUserDTO } from "../dto/user.dto";
import { User } from "./user.entity";
import { UpdateUserValidationPipe } from "./validation.pipe";

@Controller("users")

export class userController{
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers (){
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(200)
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }


    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body(new UpdateUserValidationPipe()) user_data: UpdateUserDTO) {

        const user = this.userService.updateUser(id, user_data)

        return user
    }   
}
