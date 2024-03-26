/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { BaseEntity } from './base/base.entity';


import { Product } from './product.entity';


/**
 * A TypeProduct.
 */
@Entity('type_product')
export class TypeProduct extends BaseEntity  {

    @Column({name: "name", nullable: true})
    name: string;

    @Column({name: "description", nullable: true})
    description: string;


    @OneToMany(type => Product, other => other.typeProduct)
    products: Product[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

}
