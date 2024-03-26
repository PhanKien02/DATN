/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { District } from './district.entity';


/**
 * A Province.
 */
@Entity('province')
export class Province extends BaseEntity  {

    @Column({name: "name", nullable: true})
    name: string;


    @OneToMany(type => District, other => other.province)
    districts: District[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
