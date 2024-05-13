import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
import { User } from 'src/core/domain/user/entities/user.entity';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.profiles, { eager: true })
  user: Relation<User>;

  @Column('varchar', { nullable: true })
  about: string | null;
}
