/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { DetailReceive } from './detail-receive.entity';
import { Profile } from './profile.entity';


/**
 * A Receive.
 */
@Entity('receive')
export class Receive extends BaseEntity  {

    @Column({type: 'datetime' ,name: "dates", nullable: true})
    dates: any;

    @Column({type: 'boolean' ,name: "status", nullable: true})
    status: boolean;

    @Column({name: "deliverer_name", nullable: true})
    delivererName: string;


    @OneToMany(type => DetailReceive, other => other.receive)
    detailReceives: DetailReceive[];

    @ManyToOne(type => Profile)
    profile: Profile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
