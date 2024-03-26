import { EntityRepository, Repository } from 'typeorm';
import { Ward } from '../domain/ward.entity';

@EntityRepository(Ward)
export class WardRepository extends Repository<Ward> {}
