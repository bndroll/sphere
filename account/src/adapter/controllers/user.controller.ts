import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserService } from 'src/core/domain/user/user.service';
import { UpdateUserPasswordDto } from 'src/core/domain/user/dto/update-user-password.dto';
import { UpdateUserDto } from 'src/core/domain/user/dto/update-user.dto';
import { AuthenticationService } from 'src/core/shared/iam/authentication/authentication.service';
import { ActiveUser } from 'src/core/shared/iam/decorators/active-user.decorator';
import { UserMapper } from 'src/adapter/mappers/user.mapper';

@Controller('user')
export class UserController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Get('find-me')
  async findMe(@ActiveUser('id') id: string) {
    return this.userMapper.map(await this.userService.findById(id));
  }

  @Patch('update')
  async update(@ActiveUser('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userMapper.map(await this.userService.update(id, dto));
  }

  @Patch('update-password')
  async updatePassword(
    @ActiveUser('id') id: string,
    @Body() dto: UpdateUserPasswordDto,
  ) {
    return this.authenticationService.updatePassword(id, dto);
  }
}
