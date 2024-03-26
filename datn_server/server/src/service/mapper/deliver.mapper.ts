import { Deliver } from '../../domain/deliver.entity';
import { DeliverDTO } from '../dto/deliver.dto';


/**
 * A Deliver mapper object.
 */
export class DeliverMapper {

  static fromDTOtoEntity (entityDTO: DeliverDTO): Deliver {
    if (!entityDTO) {
      return;
    }
    let entity = new Deliver();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Deliver): DeliverDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new DeliverDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
