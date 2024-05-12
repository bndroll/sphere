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
import { UpdateUserEntityDto } from 'src/core/domain/user/dto/update-user.dto';

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
  telegramId: string | null;

  @Index({ unique: true })
  @Column('varchar', { unique: true, nullable: true })
  username: string;

  @Column('varchar', { nullable: true })
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
    instance.username = dto.username;
    instance.password = dto.password ?? null;
    instance.telegramId = dto.telegramId ?? null;
    return instance;
  }

  update(dto: UpdateUserEntityDto) {
    this.phone = dto.phone ?? this.phone;
    this.birthdayDate = dto.birthdayDate ?? this.birthdayDate;
    this.gender = dto.gender ?? this.gender;
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
  }

  updateUsername(username: string) {
    this.username = username;
  }

  updateTelegramId(telegramId: string) {
    this.telegramId = telegramId;
  }
}
