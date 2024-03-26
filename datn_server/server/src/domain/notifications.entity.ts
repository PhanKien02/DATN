/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';




/**
 * A Notifications.
 */
@Entity('notifications')
export class Notifications extends BaseEntity  {

    @Column({name: "title", nullable: true})
    title: string;

    @Column({name: "content", nullable: true})
    content: string;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
