import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TypeProductDTO }  from '../service/dto/type-product.dto';
import { TypeProductMapper }  from '../service/mapper/type-product.mapper';
import { TypeProductRepository } from '../repository/type-product.repository';

const relationshipNames = [];


@Injectable()
export class TypeProductService {
    logger = new Logger('TypeProductService');

    constructor(@InjectRepository(TypeProductRepository) private typeProductRepository: TypeProductRepository) {}

      async findById(id: number): Promise<TypeProductDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.typeProductRepository.findOne(id, options);
        return TypeProductMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<TypeProductDTO>): Promise<TypeProductDTO | undefined> {
        const result = await this.typeProductRepository.findOne(options);
        return TypeProductMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<TypeProductDTO>): Promise<[TypeProductDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.typeProductRepository.findAndCount(options);
        const typeProductDTO: TypeProductDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(typeProduct => typeProductDTO.push(TypeProductMapper.fromEntityToDTO(typeProduct)));
            resultList[0] = typeProductDTO;
        }
        return resultList;
      }

      async save(typeProductDTO: TypeProductDTO, creator?: string): Promise<TypeProductDTO | undefined> {
        const entity = TypeProductMapper.fromDTOtoEntity(typeProductDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.typeProductRepository.save(entity);
        return TypeProductMapper.fromEntityToDTO(result);
      }

      async update(typeProductDTO: TypeProductDTO, updater?: string): Promise<TypeProductDTO | undefined> {
        const entity = TypeProductMapper.fromDTOtoEntity(typeProductDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.typeProductRepository.save(entity);
        return TypeProductMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.typeProductRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
