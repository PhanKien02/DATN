/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { TaskProfile } from './task-profile.entity';


/**
 * A Task.
 */
@Entity('task')
export class Task extends BaseEntity  {

    @Column({name: "title", nullable: true})
    title: string;

    @Column({name: "description", nullable: true})
    description: string;


    @OneToMany(type => TaskProfile, other => other.task)
    taskProfiles: TaskProfile[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
