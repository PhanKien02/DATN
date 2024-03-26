import { EntityRepository, Repository } from 'typeorm';
import { TaskProfile } from '../domain/task-profile.entity';

@EntityRepository(TaskProfile)
export class TaskProfileRepository extends Repository<TaskProfile> {}
