import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProductDTO }  from '../service/dto/product.dto';
import { ProductMapper }  from '../service/mapper/product.mapper';
import { ProductRepository } from '../repository/product.repository';

const relationshipNames = [];
    relationshipNames.push('area');
    relationshipNames.push('typeProduct');


@Injectable()
export class ProductService {
    logger = new Logger('ProductService');

    constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository) {}

      async findById(id: number): Promise<ProductDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.productRepository.findOne(id, options);
        return ProductMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<ProductDTO>): Promise<ProductDTO | undefined> {
        const result = await this.productRepository.findOne(options);
        return ProductMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<ProductDTO>): Promise<[ProductDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.productRepository.findAndCount(options);
        const productDTO: ProductDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(product => productDTO.push(ProductMapper.fromEntityToDTO(product)));
            resultList[0] = productDTO;
        }
        return resultList;
      }

      async save(productDTO: ProductDTO, creator?: string): Promise<ProductDTO | undefined> {
        const entity = ProductMapper.fromDTOtoEntity(productDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.productRepository.save(entity);
        return ProductMapper.fromEntityToDTO(result);
      }

      async update(productDTO: ProductDTO, updater?: string): Promise<ProductDTO | undefined> {
        const entity = ProductMapper.fromDTOtoEntity(productDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.productRepository.save(entity);
        return ProductMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.productRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
