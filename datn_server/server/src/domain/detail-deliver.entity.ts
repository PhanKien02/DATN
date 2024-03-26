/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Deliver } from './deliver.entity';
import { Product } from './product.entity';
import { Unit } from './enumeration/unit';


/**
 * A DetailDeliver.
 */
@Entity('detail_deliver')
export class DetailDeliver extends BaseEntity  {

    @Column({type: 'double' ,name: "price", nullable: true})
    price: number;

    @Column({type: 'integer' ,name: "amount", nullable: true})
    amount: number;

    @Column({type: 'simple-enum', name: 'unit', enum: Unit})
    unit: Unit;


    @ManyToOne(type => Deliver)
    deliver: Deliver;

    @ManyToOne(type => Product)
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
