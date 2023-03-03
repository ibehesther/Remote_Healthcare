import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { UpdateUserDTO } from "src/dto/update-user.dto";
import { UserService } from "src/user/user.service";

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
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user_data: UpdateUserDTO) {

        const user = this.userService.updateUser(id, user_data)

        return user
    }   
}
