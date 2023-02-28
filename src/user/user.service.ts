import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { QueryFailedError, Repository } from "typeorm";
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
        
        if(!user) throw new NotFoundException(`A user with id- ${id} was not found in the database`)

        return user;
    }


    async updateUser(id: number, user_data: UpdateUserDTO): Promise<User | HttpException>{
        try{
            const user = await this.userRepository.findOneBy({id})

            if(!user) throw new NotFoundException("User not found");


            user_data = Object.fromEntries(
                Object.entries(user_data).filter(([key, value]) => value !== undefined)
            );

            Object.assign(user, user_data)
            await this.userRepository.save(user);

            return user;
        }catch(error){
            console.log("an error ", error)

            throw new BadRequestException("User could not be created due to bad request data", {
                cause: error,
                description: "User not created"
            });
        }
    }
}