import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SwipeRepository } from 'src/core/domain/swipe/repositories/swipe.repository';
import { Swipe, SwipeType } from 'src/core/domain/swipe/entities/swipe.entity';
import { Producer } from 'kafkajs';
import {
  SwipeContract,
  SwipeDWHContract,
} from 'src/core/domain/swipe/contract/swipe.contract';
import { AxiosResponse } from 'axios';
import {
  FindProfileDto,
  FindProfileRequest,
  ProfileType,
} from 'src/core/domain/swipe/dto/find-profiles.dto';
import {
  ChatContract,
  CreateChatContract,
} from 'src/core/domain/swipe/contract/chat.contract';
import { DeleteProfileContract } from 'src/core/domain/swipe/contract/delete-profile.contract';

@Injectable()
export class SwipeService {
  private readonly logger = new Logger(SwipeService.name);

  constructor(
    @Inject('KAFKA_SWIPE_DWH_PRODUCER')
    private readonly producerSwipeDWH: Producer,
    @Inject('KAFKA_SWIPE_CHAT_PRODUCER')
    private readonly producerChat: Producer,
    private readonly swipeRepository: SwipeRepository,
    private readonly httpService: HttpService,
  ) {}

  async create(dto: SwipeContract.Message) {
    if (dto.profileId === dto.recProfileId) {
      return null;
    }

    const profiles = await this.httpService.axiosRef
      .post<
        FindProfileRequest[],
        AxiosResponse<FindProfileRequest[]>,
        { ids: string[] }
      >(`${process.env.ACCOUNT_SERVICE_URL}/profile/find-by-ids`, {
        ids: [dto.profileId, dto.recProfileId],
      })
      .then((r) => r.data);
    if (profiles.length < 2) {
      return null;
    }

    const profile = profiles.find((profile) => profile.id === dto.profileId);
    const profileRec = profiles.find(
      (profile) => profile.id === dto.recProfileId,
    );

    const lastSwipe = await this.swipeRepository.findByProfileIds({
      profileId: dto.recProfileId,
      profileRecId: dto.profileId,
    });

    const existingSwipe = await this.swipeRepository.findByProfileIds({
      profileId: dto.profileId,
      profileRecId: dto.recProfileId,
    });
    if (existingSwipe && dto.type === existingSwipe.type && lastSwipe) {
      lastSwipe.reaction = true;
      await this.swipeRepository.save(lastSwipe);
      return null;
    } else if (existingSwipe && dto.type !== existingSwipe.type) {
      await this.swipeRepository.remove(existingSwipe);
    }

    if (!lastSwipe) {
      if (
        profile.type === ProfileType.User &&
        profileRec.type === ProfileType.Event &&
        profileRec?.info?.open
      ) {
        await this.sendAddChatMember({
          profileId: profileRec.id,
          profileSecondId: profile.id,
        });
      }
    } else {
      if (dto.type !== SwipeType.Skip) {
        lastSwipe.reaction = true;
        await this.swipeRepository.save(lastSwipe);
      }

      if (profile.type === ProfileType.User) {
        if (profileRec.type === ProfileType.Event) {
          if (dto.type === SwipeType.Like) {
            if (profileRec?.info?.open) {
              await this.sendAddChatMember({
                profileId: profileRec.id,
                profileSecondId: profile.id,
              });
            } else {
              if (lastSwipe.type === SwipeType.Like) {
                await this.sendAddChatMember({
                  profileId: profileRec.id,
                  profileSecondId: profile.id,
                });
              }
            }
          }
        } else if (
          profileRec.type === ProfileType.User &&
          lastSwipe.type === SwipeType.Like
        ) {
          await this.sendAddChat({
            profileId: profile.id,
            profileSecondId: profileRec.id,
            type: ProfileType.User,
          });
        }
      } else if (
        profile.type === ProfileType.Event &&
        profileRec.type === ProfileType.User
      ) {
        if (lastSwipe.type === SwipeType.Like) {
          await this.sendAddChatMember({
            profileId: profile.id,
            profileSecondId: profileRec.id,
          });
        }
      }
    }

    const swipe = Swipe.create({
      profileId: dto.profileId,
      profileRecId: dto.recProfileId,
      type: dto.type,
    });
    await this.swipeRepository.save(swipe);

    const swipeDWHMessage: SwipeDWHContract.Message = {
      profileId: dto.profileId,
      recProfileId: dto.recProfileId,
      type: dto.type,
    };
    await this.producerSwipeDWH.send({
      topic: SwipeDWHContract.topic,
      messages: [{ value: JSON.stringify(swipeDWHMessage) }],
    });
  }

  async findProfiles(dto: FindProfileDto) {
    const notReactedSwipes = await this.swipeRepository
      .findNotReactedSwipes(dto.profileId)
      .then((r) => r.map((item) => item.profileId));
    return await this.httpService.axiosRef
      .post<
        FindProfileRequest[],
        AxiosResponse<FindProfileRequest[]>,
        { ids: string[] }
      >(`${process.env.ACCOUNT_SERVICE_URL}/profile/find-by-ids`, {
        ids: notReactedSwipes,
      })
      .then((r) => r.data);
  }

  async clearProfileSwipes(dto: DeleteProfileContract.Message) {
    const profileSwipes = await this.swipeRepository.findByProfileId(dto.id);
    await this.swipeRepository.remove(profileSwipes);
  }

  async sendAddChatMember(dto: ChatContract.Message) {
    this.logger.verbose('Chat member added; Value:', dto);
    await this.producerChat.send({
      topic: ChatContract.topic,
      messages: [{ value: JSON.stringify(dto) }],
    });
  }

  async sendAddChat(dto: CreateChatContract.Message) {
    this.logger.verbose('Chat created; Value:', dto);
    await this.producerChat.send({
      topic: CreateChatContract.topic,
      messages: [{ value: JSON.stringify(dto) }],
    });
  }

  async clearSwipe() {
    const oldSwipes = await this.swipeRepository.findOld();
    await this.swipeRepository.remove(oldSwipes);
  }
}
