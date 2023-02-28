import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { CreateUserDTO, UpdateUserDTO } from "../dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id})
        
        if(!user) throw new NotFoundException("User not found", {
            cause: new Error(),
            description: `A user with id- ${id} was not found in the database`
        })

        return user;
    }

    async createUser(user_data: CreateUserDTO): Promise<User>{
        const user = await this.userRepository.save(user_data);
        console.log("---- A New user ----- ", user)
        
        if(!user){
            throw new BadRequestException("New user not created", {
                cause: new Error(),
                description: `User could not be created because of bad request data`
            });
        }

        return user;
    }

    // async updateUser(user_data: UpdateUserDTO): Promise<User>{

    // }
}