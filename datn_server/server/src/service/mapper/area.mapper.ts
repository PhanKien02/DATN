import { Area } from '../../domain/area.entity';
import { AreaDTO } from '../dto/area.dto';


/**
 * A Area mapper object.
 */
export class AreaMapper {

  static fromDTOtoEntity (entityDTO: AreaDTO): Area {
    if (!entityDTO) {
      return;
    }
    let entity = new Area();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: Area): AreaDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new AreaDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
