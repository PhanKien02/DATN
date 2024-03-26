/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { DetailDeliver } from './detail-deliver.entity';
import { Profile } from './profile.entity';


/**
 * A Deliver.
 */
@Entity('deliver')
export class Deliver extends BaseEntity  {

    @Column({type: 'datetime' ,name: "dates", nullable: true})
    dates: any;

    @Column({type: 'boolean' ,name: "status", nullable: true})
    status: boolean;


    @OneToMany(type => DetailDeliver, other => other.deliver)
    detailDelivers: DetailDeliver[];

    @ManyToOne(type => Profile)
    profile: Profile;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
