import { Body, Controller } from '@nestjs/common';
import { CreateProfileControllerDto } from 'src/core/domain/profile/dto/create-profile.dto';
import { ProfileService } from 'src/core/domain/profile/profile.service';
import { ProfileMapper } from 'src/adapter/controllers/profile/mappers/profile.mapper';
import { ActiveUser } from 'src/core/shared/iam/decorators/active-user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly profileMapper: ProfileMapper,
  ) {}

  async create(
    @ActiveUser('id') userId: string,
    @Body() dto: CreateProfileControllerDto,
  ) {
    const profile = await this.profileService.create({
      userId: userId,
      ...dto,
    });
    return this.profileMapper.map(profile);
  }
}
