import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import {
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from './dto/refresh-token.dto';
import {
  InvalidatedRefreshTokenError,
  RefreshTokenIdsStorage,
} from './storages/refresh-token-ids.storage';
import { randomUUID } from 'crypto';
import { UserService } from 'src/core/domain/user/user.service';
import { JwtConfig } from 'src/config/jwt.config';
import { AuthenticationErrorMessages } from 'src/core/shared/iam/iam.constants';
import { UserErrorMessages } from 'src/core/domain/user/user.constants';
import { UpdateUserPasswordDto } from 'src/core/domain/user/dto/update-user-password.dto';
import { generateShortId } from 'src/lang/utils/generate-short-id';
import { SaveSsoDto } from 'src/core/shared/iam/authentication/dto/save-sso.dto';
import { SsoTokenStorage } from 'src/core/shared/iam/authentication/storages/sso-token.storage';
import { ValidateSso } from 'src/core/shared/iam/authentication/dto/validate-sso.dto';
import { User } from 'src/core/domain/user/entities/user.entity';
import { VerifySsoDto } from 'src/core/shared/iam/authentication/dto/verify-sso.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(JwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof JwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private readonly ssoTokenStorage: SsoTokenStorage,
  ) {}

  async signUp(dto: SignUpDto) {
    if (!dto.password && !dto.telegramId) {
      throw new BadRequestException(
        AuthenticationErrorMessages.UnspecifiedProvider,
      );
    }

    const hashedPassword = dto.password
      ? await this.hashingService.hash(dto.password)
      : null;
    return await this.userService.create({
      username: dto.username,
      telegramId: dto.telegramId,
      password: hashedPassword,
    });
  }

  async signIn(dto: SignInDto) {
    if (!dto.password && !dto.telegramId) {
      throw new BadRequestException(
        AuthenticationErrorMessages.UnspecifiedProvider,
      );
    }

    const user = await this.userService.findByName(dto.username);
    if (!user) {
      throw new UnauthorizedException(UserErrorMessages.UserNotFound);
    }

    if (dto.password) {
      if (!user.password) {
        throw new UnauthorizedException(
          AuthenticationErrorMessages.WrongPassword,
        );
      }

      const isEqual = await this.hashingService.compare(
        dto.password,
        user.password,
      );
      if (!isEqual) {
        throw new UnauthorizedException(
          AuthenticationErrorMessages.WrongPassword,
        );
      }
    } else if (dto.telegramId) {
      if (!user.telegramId || user.telegramId !== dto.telegramId) {
        throw new UnauthorizedException(
          AuthenticationErrorMessages.WrongTelegramId,
        );
      }
    }

    return await this.generateTokens(user.id);
  }

  async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    try {
      const { id, refreshTokenId } = await this.jwtService.verifyAsync<
        ActiveUserData & { refreshTokenId: string }
      >(dto.refreshToken, {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
      });

      const user = await this.userService.findById(id);
      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      );
      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error('Refresh token is invalid');
      }

      return await this.generateTokens(user.id);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        throw new UnauthorizedException(
          AuthenticationErrorMessages.AccessDenied,
        );
      }

      throw new UnauthorizedException();
    }
  }

  async updatePassword(
    id: string,
    dto: UpdateUserPasswordDto,
  ): Promise<RefreshTokenResponseDto> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException(UserErrorMessages.UserNotFound);
    }
    if (user.password) {
      const isEqual = await this.hashingService.compare(
        dto.password,
        user.password,
      );
      if (!isEqual) {
        throw new UnauthorizedException(
          AuthenticationErrorMessages.WrongPassword,
        );
      }

      const isEqualNewPassword = await this.hashingService.compare(
        dto.newPassword,
        user.password,
      );
      if (isEqualNewPassword) {
        throw new BadRequestException(
          AuthenticationErrorMessages.NewPasswordIsEqual,
        );
      }
    }

    const newPassword = await this.hashingService.hash(dto.newPassword);
    await this.userService.updatePassword(id, {
      password: dto.password,
      newPassword: newPassword,
    });

    await this.refreshTokenIdsStorage.invalidate(user.id);
    return await this.generateTokens(user.id);
  }

  async generateSso(): Promise<string> {
    return generateShortId();
  }

  async saveSso(dto: SaveSsoDto) {
    const verifyCode = generateShortId();
    await this.ssoTokenStorage.insert(verifyCode, dto);
    return verifyCode;
  }

  async validateSso(dto: ValidateSso) {
    const data = await this.ssoTokenStorage.get(dto.verifyCode);
    if (!data || data.code !== dto.code) {
      throw new UnauthorizedException();
    }
    await this.refreshTokenIdsStorage.invalidate(data.userId);
    await this.ssoTokenStorage.invalidate(dto.verifyCode);
    return await this.generateTokens(data.userId);
  }

  async bindSso(userId: string) {
    const verifyCode = generateShortId();
    await this.ssoTokenStorage.insert(verifyCode, { userId: userId });
    return verifyCode;
  }

  async verifyUserSso(dto: VerifySsoDto): Promise<User> {
    const data = await this.ssoTokenStorage.get(dto.code);
    if (!data) {
      throw new UnauthorizedException();
    }
    return await this.userService.updateTelegramId(data.userId, dto.telegramId);
  }

  async generateTokens(userId: string): Promise<RefreshTokenResponseDto> {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        userId,
        this.jwtConfiguration.accessTokenTtl,
      ),
      this.signToken(userId, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);

    await this.refreshTokenIdsStorage.insert(userId, refreshTokenId);

    return { accessToken, refreshToken };
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        id: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: expiresIn,
      },
    );
  }
}
