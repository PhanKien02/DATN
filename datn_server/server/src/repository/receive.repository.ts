import { EntityRepository, Repository } from 'typeorm';
import { Receive } from '../domain/receive.entity';

@EntityRepository(Receive)
export class ReceiveRepository extends Repository<Receive> {}
