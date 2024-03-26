import { EntityRepository, Repository } from 'typeorm';
import { TypeProduct } from '../domain/type-product.entity';

@EntityRepository(TypeProduct)
export class TypeProductRepository extends Repository<TypeProduct> {}
