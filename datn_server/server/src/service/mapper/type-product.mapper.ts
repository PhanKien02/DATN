import { TypeProduct } from '../../domain/type-product.entity';
import { TypeProductDTO } from '../dto/type-product.dto';


/**
 * A TypeProduct mapper object.
 */
export class TypeProductMapper {

  static fromDTOtoEntity (entityDTO: TypeProductDTO): TypeProduct {
    if (!entityDTO) {
      return;
    }
    let entity = new TypeProduct();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
        entity[field] = entityDTO[field];
    });
    return entity;

  }

  static fromEntityToDTO (entity: TypeProduct): TypeProductDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new TypeProductDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
        entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
