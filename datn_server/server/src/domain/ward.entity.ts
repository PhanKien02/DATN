/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Profile } from './profile.entity';
import { District } from './district.entity';


/**
 * A Ward.
 */
@Entity('ward')
export class Ward extends BaseEntity  {

    @Column({name: "name", nullable: true})
    name: string;


    @OneToMany(type => Profile, other => other.ward)
    profiles: Profile[];

    @ManyToOne(type => District)
    district: District;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
