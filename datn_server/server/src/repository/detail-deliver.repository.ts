import { EntityRepository, Repository } from 'typeorm';
import { DetailDeliver } from '../domain/detail-deliver.entity';

@EntityRepository(DetailDeliver)
export class DetailDeliverRepository extends Repository<DetailDeliver> {}
