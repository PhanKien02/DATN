import { Receive } from '../../domain/receive.entity';
import { ReceiveDTO } from '../dto/receive.dto';


/**
 * A Receive mapper object.
 */
export class ReceiveMapper {

  static fromDTOtoEntity (entityDTO: ReceiveDTO): Receive {
    if (!entityDTO) {
      return;
    }
    let entity = new Receive();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Receive): ReceiveDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ReceiveDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
