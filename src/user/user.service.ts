import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        // @Inject("USER_REPOSITORY")
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        // console.log("users", this.userRepository.find())
        return await this.userRepository.find();
    }
}