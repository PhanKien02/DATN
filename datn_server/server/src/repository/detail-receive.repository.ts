import { EntityRepository, Repository } from 'typeorm';
import { DetailReceive } from '../domain/detail-receive.entity';

@EntityRepository(DetailReceive)
export class DetailReceiveRepository extends Repository<DetailReceive> {}
