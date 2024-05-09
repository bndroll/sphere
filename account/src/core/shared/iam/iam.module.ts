import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/jwt.config';
import { HashingService } from 'src/core/shared/iam/hashing/hashing.service';
import { BcryptService } from 'src/core/shared/iam/hashing/bcrypt.service';
import { UserModule } from 'src/core/domain/user/user.module';

@Module({
  imports: [UserModule, JwtModule.registerAsync(JwtConfig.asProvider())],
  providers: [{ provide: HashingService, useClass: BcryptService }],
})
export class IamModule {}
