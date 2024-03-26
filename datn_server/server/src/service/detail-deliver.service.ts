import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DetailDeliverDTO }  from '../service/dto/detail-deliver.dto';
import { DetailDeliverMapper }  from '../service/mapper/detail-deliver.mapper';
import { DetailDeliverRepository } from '../repository/detail-deliver.repository';

const relationshipNames = [];
    relationshipNames.push('deliver');
    relationshipNames.push('product');


@Injectable()
export class DetailDeliverService {
    logger = new Logger('DetailDeliverService');

    constructor(@InjectRepository(DetailDeliverRepository) private detailDeliverRepository: DetailDeliverRepository) {}

      async findById(id: number): Promise<DetailDeliverDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.detailDeliverRepository.findOne(id, options);
        return DetailDeliverMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<DetailDeliverDTO>): Promise<DetailDeliverDTO | undefined> {
        const result = await this.detailDeliverRepository.findOne(options);
        return DetailDeliverMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<DetailDeliverDTO>): Promise<[DetailDeliverDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.detailDeliverRepository.findAndCount(options);
        const detailDeliverDTO: DetailDeliverDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(detailDeliver => detailDeliverDTO.push(DetailDeliverMapper.fromEntityToDTO(detailDeliver)));
            resultList[0] = detailDeliverDTO;
        }
        return resultList;
      }

      async save(detailDeliverDTO: DetailDeliverDTO, creator?: string): Promise<DetailDeliverDTO | undefined> {
        const entity = DetailDeliverMapper.fromDTOtoEntity(detailDeliverDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.detailDeliverRepository.save(entity);
        return DetailDeliverMapper.fromEntityToDTO(result);
      }

      async update(detailDeliverDTO: DetailDeliverDTO, updater?: string): Promise<DetailDeliverDTO | undefined> {
        const entity = DetailDeliverMapper.fromDTOtoEntity(detailDeliverDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.detailDeliverRepository.save(entity);
        return DetailDeliverMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.detailDeliverRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
