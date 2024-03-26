import { EntityRepository, Repository } from 'typeorm';
import { Deliver } from '../domain/deliver.entity';

@EntityRepository(Deliver)
export class DeliverRepository extends Repository<Deliver> {}
