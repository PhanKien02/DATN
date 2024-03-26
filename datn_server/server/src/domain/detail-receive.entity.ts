/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Receive } from './receive.entity';
import { Product } from './product.entity';
import { Unit } from './enumeration/unit';


/**
 * A DetailReceive.
 */
@Entity('detail_receive')
export class DetailReceive extends BaseEntity  {

    @Column({type: 'double' ,name: "price", nullable: true})
    price: number;

    @Column({type: 'integer' ,name: "amount", nullable: true})
    amount: number;

    @Column({type: 'simple-enum', name: 'unit', enum: Unit})
    unit: Unit;


    @ManyToOne(type => Receive)
    receive: Receive;

    @ManyToOne(type => Product)
    product: Product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
