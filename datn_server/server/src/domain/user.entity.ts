import { Authority } from './authority.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Exclude } from 'class-transformer';

@Entity('nhi_user')
export class User extends BaseEntity {
  @Column()
  email: string;
  @Column({ default: false })
  activated?: boolean;
  @ManyToMany(() => Authority)
  @JoinTable()
  authorities?: any[];
  @Column({
    type: 'varchar',
  })
  @Exclude()
  password: string;
  @Column({ nullable: true })
  activationKey?: string;
  @Column({ nullable: true })
  resetKey?: string;
  @Column({ nullable: true })
  resetDate?: Date;
}
