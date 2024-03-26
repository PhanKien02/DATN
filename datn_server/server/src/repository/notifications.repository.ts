import { EntityRepository, Repository } from 'typeorm';
import { Notifications } from '../domain/notifications.entity';

@EntityRepository(Notifications)
export class NotificationsRepository extends Repository<Notifications> {}
