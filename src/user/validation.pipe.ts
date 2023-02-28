import {
    PipeTransform,
    BadRequestException
  } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from 'src/dto/user.dto';
import { createUserSchema, updateUserSchema } from 'src/validators/user.validator';
  

  export class UpdateUserValidationPipe implements PipeTransform<UpdateUserDTO> {
    transform(value: UpdateUserDTO): UpdateUserDTO {
        const result = updateUserSchema.validate(value);

        if (result.error) {
            const errorMessages = result.error.details.map((d) => d.message).join();
            throw new BadRequestException(errorMessages);
        }
        return value;
    }
  }