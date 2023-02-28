import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO, SignInUserDTO } from "src/dto/user.dto";
import { User } from "src/user/user.entity";
import { QueryFailedError, Repository } from "typeorm";


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}
    
    async signUpUser(user_data: CreateUserDTO): Promise<User | HttpException>{
        try{
            let user = this.userRepository.create(user_data)
            await user.hashPassword(user_data.password);
            await this.userRepository.save(user);
            
            if(!user){
                throw new BadRequestException("User could not be created due to bad request data");
            }
            return user;
        }catch(error){
            if (error instanceof QueryFailedError && error.driverError.code === 'ER_DUP_ENTRY') {
                throw new BadRequestException('Duplicate record');
            }
            throw new BadRequestException("User could not be created due to bad request data", {
                cause: error,
                description: "User not created"
            });
        }
    }

    async signInUser(user_data: SignInUserDTO): Promise<User | HttpException> {

        let user = await this.userRepository.findOneBy({email: user_data.email})

        if(!user) throw new NotFoundException("User not found")

        let password = await user.comparePassword(user_data.password);
        
        if(!password) throw new UnauthorizedException("User is not authenicated");

        return user
    }
}