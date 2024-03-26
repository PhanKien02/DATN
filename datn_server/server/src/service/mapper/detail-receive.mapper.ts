import { DetailReceive } from '../../domain/detail-receive.entity';
import { DetailReceiveDTO } from '../dto/detail-receive.dto';


/**
 * A DetailReceive mapper object.
 */
export class DetailReceiveMapper {

  static fromDTOtoEntity (entityDTO: DetailReceiveDTO): DetailReceive {
    if (!entityDTO) {
      return;
    }
    let entity = new DetailReceive();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: DetailReceive): DetailReceiveDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new DetailReceiveDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
