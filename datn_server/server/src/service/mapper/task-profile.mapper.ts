import { TaskProfile } from '../../domain/task-profile.entity';
import { TaskProfileDTO } from '../dto/task-profile.dto';


/**
 * A TaskProfile mapper object.
 */
export class TaskProfileMapper {

  static fromDTOtoEntity (entityDTO: TaskProfileDTO): TaskProfile {
    if (!entityDTO) {
      return;
    }
    let entity = new TaskProfile();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: TaskProfile): TaskProfileDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new TaskProfileDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
