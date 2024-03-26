import { DetailDeliver } from '../../domain/detail-deliver.entity';
import { DetailDeliverDTO } from '../dto/detail-deliver.dto';


/**
 * A DetailDeliver mapper object.
 */
export class DetailDeliverMapper {

  static fromDTOtoEntity (entityDTO: DetailDeliverDTO): DetailDeliver {
    if (!entityDTO) {
      return;
    }
    let entity = new DetailDeliver();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: DetailDeliver): DetailDeliverDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new DetailDeliverDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
