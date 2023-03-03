import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "src/dto/create-user.dto";
import { SignInUserDTO } from "src/dto/signin-user.dto";
import { User } from "src/user/user.entity";
import { QueryFailedError, Repository } from "typeorm";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async signUpUser(user_data: CreateUserDTO): Promise<User | HttpException>{
        try{
            console.log(user_data)
            let user = this.userRepository.create(user_data)

            console.log(user)
            // Hash password before storing in database
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user_data.password, salt);
            user.password = hashedPassword;

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

        let isCorrectPassword = await bcrypt.compare(user_data.password, user.password);
        
        if(!isCorrectPassword) throw new UnauthorizedException("User is not authenicated");

        return user
    }
}