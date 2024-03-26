/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { TaskProfile } from './task-profile.entity';
import { Deliver } from './deliver.entity';
import { Receive } from './receive.entity';
import { Ward } from './ward.entity';
import { Area } from './area.entity';

import { User } from './user.entity';

/**
 * A Profile.
 */
@Entity('profile')
export class Profile extends BaseEntity  {

    @Column({name: "full_name", nullable: true})
    fullName: string;

    @Column({name: "phone", nullable: true})
    phone: string;

    @Column({type: 'boolean' ,name: "gender", nullable: true})
    gender: boolean;

    @Column({type: 'datetime' ,name: "dob", nullable: true})
    dob: any;

    @Column({name: "avatar", nullable: true})
    avatar: string;


    @OneToOne(type => User)
@JoinColumn()    user: User;

    @OneToMany(type => TaskProfile, other => other.profile)
    taskProfiles: TaskProfile[];

    @OneToMany(type => Deliver, other => other.profile)
    delivers: Deliver[];

    @OneToMany(type => Receive, other => other.profile)
    receives: Receive[];

    @ManyToOne(type => Ward)
    ward: Ward;

    @ManyToOne(type => Area)
    area: Area;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
