import { EntityRepository, Repository } from 'typeorm';
import { Area } from '../domain/area.entity';

@EntityRepository(Area)
export class AreaRepository extends Repository<Area> {}
