import { Notifications } from '../../domain/notifications.entity';
import { NotificationsDTO } from '../dto/notifications.dto';


/**
 * A Notifications mapper object.
 */
export class NotificationsMapper {

  static fromDTOtoEntity (entityDTO: NotificationsDTO): Notifications {
    if (!entityDTO) {
      return;
    }
    let entity = new Notifications();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Notifications): NotificationsDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new NotificationsDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
