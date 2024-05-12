import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/jwt.config';
import { HashingService } from 'src/core/shared/iam/hashing/hashing.service';
import { BcryptService } from 'src/core/shared/iam/hashing/bcrypt.service';
import { UserModule } from 'src/core/domain/user/user.module';
import { AuthenticationService } from 'src/core/shared/iam/authentication/authentication.service';
import { RefreshTokenIdsStorage } from 'src/core/shared/iam/authentication/storages/refresh-token-ids.storage';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from 'src/core/shared/iam/authentication/guards/authentication.guard';
import { AccessTokenGuard } from 'src/core/shared/iam/authentication/guards/access-token.guard';
import { MessengerModule } from 'src/core/shared/messenger/messenger.module';
import { SsoTokenStorage } from 'src/core/shared/iam/authentication/storages/sso-token.storage';

@Module({
  imports: [
    UserModule,
    MessengerModule,
    JwtModule.registerAsync(JwtConfig.asProvider()),
  ],
  providers: [
    { provide: HashingService, useClass: BcryptService },
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    AuthenticationService,
    RefreshTokenIdsStorage,
    SsoTokenStorage,
    AccessTokenGuard,
  ],
  exports: [AuthenticationService],
})
export class IamModule {}
