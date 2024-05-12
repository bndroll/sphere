import { BadRequestException } from '@nestjs/common';

export class UsernameAlreadyExistException extends BadRequestException {
  constructor() {
    super('User with same name already exists');
  }
}
