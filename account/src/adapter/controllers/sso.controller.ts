import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from 'src/core/shared/iam/authentication/authentication.service';
import { Auth } from 'src/core/shared/iam/decorators/auth.decorator';
import { AuthType } from 'src/core/shared/iam/enums/auth-type.enum';
import { GenerateSsoResponseDto } from 'src/core/shared/iam/authentication/dto/generate-sso.dto';
import { ConfigService } from '@nestjs/config';
import { ValidateSso } from 'src/core/shared/iam/authentication/dto/validate-sso.dto';

@Auth(AuthType.None)
@Controller('sso')
export class SsoController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('generate')
  async generate(): Promise<GenerateSsoResponseDto> {
    return {
      link: `${this.configService.get('TELEGRAM_BOT_LINK')}?start=${await this.authenticationService.generateSso()}`,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validate(@Body() dto: ValidateSso) {
    return await this.authenticationService.validateSso(dto);
  }
}
