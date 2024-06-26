import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfileService } from 'src/core/domain/profile/profile.service';
import { ProfileMapper } from 'src/adapter/controllers/profile/mappers/profile.mapper';
import { ActiveUser } from 'src/core/shared/iam/decorators/active-user.decorator';
import { CreateProfileDto } from 'src/core/domain/profile/dto/create-profile.dto';
import { UpdateProfileDto } from 'src/core/domain/profile/dto/update-profile.dto';
import { FindByIdsDto } from 'src/core/domain/profile/dto/find-by-ids.dto';
import { Auth } from 'src/core/shared/iam/decorators/auth.decorator';
import { AuthType } from 'src/core/shared/iam/enums/auth-type.enum';
import { ProfileJoinedMapper } from 'src/adapter/controllers/profile/mappers/profile-joined.mapper';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly profileMapper: ProfileMapper,
    private readonly profileJoinedMapper: ProfileJoinedMapper,
  ) {}

  @Post()
  async create(
    @ActiveUser('id') userId: string,
    @Body() dto: CreateProfileDto,
  ) {
    const profile = await this.profileService.create(userId, dto);
    return this.profileMapper.map(profile);
  }

  @Get('find-by-user')
  async findUserProfiles(@ActiveUser('id') userId: string) {
    const profiles = await this.profileService.findByUser(userId);
    return profiles.map((profile) => this.profileMapper.map(profile));
  }

  @Auth(AuthType.None)
  @Post('find-by-ids')
  async findByIds(@Body() dto: FindByIdsDto) {
    const profiles = await this.profileService.findByIds(dto);
    return profiles.map((profile) => this.profileJoinedMapper.map(profile));
  }

  @Patch(':id')
  async update(
    @ActiveUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ) {
    const profile = await this.profileService.update(id, userId, dto);
    return this.profileMapper.map(profile);
  }

  @Delete(':id')
  async remove(@ActiveUser('id') userId: string, @Param('id') id: string) {
    const profile = await this.profileService.remove(id, userId);
    return this.profileMapper.map(profile);
  }
}
