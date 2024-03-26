/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { DetailDeliver } from './detail-deliver.entity';
import { DetailReceive } from './detail-receive.entity';
import { Area } from './area.entity';
import { TypeProduct } from './type-product.entity';


/**
 * A Product.
 */
@Entity('product')
export class Product extends BaseEntity  {

    @Column({name: "name", nullable: true})
    name: string;

    @Column({type: 'integer' ,name: "amount", nullable: true})
    amount: number;

    @Column({type: 'boolean' ,name: "status", nullable: true})
    status: boolean;


    @OneToMany(type => DetailDeliver, other => other.product)
    detailDelivers: DetailDeliver[];

    @OneToMany(type => DetailReceive, other => other.product)
    detailReceives: DetailReceive[];

    @ManyToOne(type => Area)
    area: Area;

    @ManyToOne(type => TypeProduct)
    typeProduct: TypeProduct;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
