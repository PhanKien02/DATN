/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Product } from './product.entity';
import { Profile } from './profile.entity';


/**
 * A Area.
 */
@Entity('area')
export class Area extends BaseEntity  {

    @Column({name: "name", nullable: true})
    name: string;

    @Column({type: 'double' ,name: "area", nullable: true})
    area: number;


    @OneToMany(type => Product, other => other.area)
    products: Product[];

    @OneToMany(type => Profile, other => other.area)
    profiles: Profile[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
