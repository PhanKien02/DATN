/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Task } from './task.entity';
import { Profile } from './profile.entity';


/**
 * A TaskProfile.
 */
@Entity('task_profile')
export class TaskProfile extends BaseEntity  {

    @Column({type: 'datetime' ,name: "dates", nullable: true})
    dates: any;


    @ManyToOne(type => Task)
    task: Task;

    @ManyToOne(type => Profile)
    profile: Profile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
