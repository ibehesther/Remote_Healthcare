import {
    PipeTransform,
    BadRequestException
  } from '@nestjs/common';
import { CreateUserDTO } from 'src/dto/user.dto';
import { createUserSchema } from 'src/validators/user.validator';
  
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