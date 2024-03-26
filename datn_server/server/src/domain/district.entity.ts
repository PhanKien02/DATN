/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Ward } from './ward.entity';
import { Province } from './province.entity';


/**
 * A District.
 */
@Entity('district')
export class District extends BaseEntity  {

    @Column({name: "name", nullable: true})
    name: string;


    @OneToMany(type => Ward, other => other.district)
    wards: Ward[];

    @ManyToOne(type => Province)
    province: Province;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
