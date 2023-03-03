import { Module } from "@nestjs/common";
import { userController } from "src/user/user.controller";
import { UserService } from "src/user/user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/user/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, ],
    controllers: [userController]
})

export class UserModule {}