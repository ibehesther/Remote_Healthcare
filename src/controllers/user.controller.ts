import { Controller, Get } from "@nestjs/common";
import { User } from "src/entites/user.entity";
import { UserService } from "src/services/user.service";

@Controller("users")

export class userController{
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers (){
        return this.userService.findAll();
    }
}
