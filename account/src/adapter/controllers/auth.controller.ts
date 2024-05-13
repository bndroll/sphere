import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from 'src/core/shared/iam/authentication/authentication.service';
import { SignUpDto } from 'src/core/shared/iam/authentication/dto/sign-up.dto';
import { SignInDto } from 'src/core/shared/iam/authentication/dto/sign-in.dto';
import { RefreshTokenDto } from 'src/core/shared/iam/authentication/dto/refresh-token.dto';
import { Auth } from 'src/core/shared/iam/decorators/auth.decorator';
import { AuthType } from 'src/core/shared/iam/enums/auth-type.enum';
import { UserMapper } from 'src/adapter/mappers/user.mapper';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userMapper: UserMapper,
  ) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.userMapper.map(await this.authenticationService.signUp(dto));
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    return await this.authenticationService.signIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return await this.authenticationService.refreshToken(dto);
  }
}
