import { BadRequestException, PipeTransform } from "@nestjs/common";
import { CreateUserDTO, SignInUserDTO } from "src/dto/user.dto";
import { createUserSchema, signinUserSchema } from "src/validators/user.validator";


export class CreateUserValidationPipe implements PipeTransform<CreateUserDTO> {
    transform(value: CreateUserDTO): CreateUserDTO {
        const result = createUserSchema.validate(value);

        if (result.error) {
            const errorMessages = result.error.details.map((d) => d.message).join();
            throw new BadRequestException(errorMessages);
        }
        return value;
    }
}

export class SignInUserValidationPipe implements PipeTransform<SignInUserDTO> {
    transform(value: SignInUserDTO): SignInUserDTO {
        const result = signinUserSchema.validate(value);

        if (result.error) {
            const errorMessages = result.error.details.map((d) => d.message).join();
            throw new BadRequestException(errorMessages);
        }
        return value;
    }
}