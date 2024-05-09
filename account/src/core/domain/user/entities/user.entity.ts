import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from 'src/core/domain/profile/entities/profile.entity';
import { CreateUserEntityDto } from 'src/core/domain/user/dto/create-user.dto';
import { generateString } from '@nestjs/typeorm';

export enum UserGender {
  Male = 'Male',
  Female = 'Female',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column('bigint', { name: 'telegram_id', unique: true, nullable: true })
  telegramId: number | null;

  @Column('varchar')
  name: string;

  @Column({ nullable: true })
  password: string | null;

  @Column('varchar', { nullable: true })
  phone: string | null;

  @Column('timestamp', { name: 'birthday_date', nullable: true })
  birthdayDate: Date | null;

  @Column({ type: 'enum', enum: UserGender, nullable: true })
  gender: UserGender | null;

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Relation<Profile[]>;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDate: Date;

  static create(dto: CreateUserEntityDto) {
    const instance = new User();
    instance.id = generateString();
    instance.name = dto.name;
    instance.password = dto.password ?? null;
    instance.telegramId = dto.telegramId ?? null;
    return instance;
  }
}
