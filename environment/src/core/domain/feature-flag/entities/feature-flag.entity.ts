import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'feature-flag' })
export class FeatureFlag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  title: string;

  @Column('varchar')
  description: string;

  @Column('boolean', { default: false })
  enable: boolean;

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
}
