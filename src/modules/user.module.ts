import { Module } from "@nestjs/common";
import { userController } from "src/controllers/user.controller";
import { UserService } from "src/services/user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/entites/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService],
    controllers: [userController]
})

export class UserModule {}