import { EntityRepository, Repository } from 'typeorm';
import { Province } from '../domain/province.entity';

@EntityRepository(Province)
export class ProvinceRepository extends Repository<Province> {}
