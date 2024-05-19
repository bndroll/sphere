import { Inject, Injectable } from '@nestjs/common';
import { SwipeRepository } from 'src/core/domain/swipe/repositories/swipe.repository';
import {
  CreateSwipeDto,
  DWHSwipeTopic,
} from 'src/core/domain/swipe/dto/create-swipe.dto';
import { Swipe } from 'src/core/domain/swipe/entities/swipe.entity';
import { Producer } from 'kafkajs';

@Injectable()
export class SwipeService {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly producer: Producer,
    private readonly swipeRepository: SwipeRepository,
  ) {}

  async create(dto: CreateSwipeDto) {
    const existingSwipe =
      await this.swipeRepository.findByProfileIdsAndType(dto);
    if (existingSwipe) {
      return null;
    }

    const swipe = Swipe.create({
      profileId: dto.profileId,
      profileRecId: dto.profileRecId,
      type: dto.type,
    });
    await this.swipeRepository.save(swipe);

    await this.producer.send({
      topic: DWHSwipeTopic,
      messages: [{ value: JSON.stringify(swipe) }],
    });
  }

  async findProfiles() {}
}
