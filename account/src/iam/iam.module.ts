import { Module } from '@nestjs/common';
import { IamService } from './iam.service';
import { IamController } from './iam.controller';

@Module({
  imports: [],
  controllers: [IamController],
  providers: [IamService],
})
export class IamModule {
}
