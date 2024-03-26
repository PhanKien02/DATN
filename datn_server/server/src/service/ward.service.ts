import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { WardDTO }  from '../service/dto/ward.dto';
import { WardMapper }  from '../service/mapper/ward.mapper';
import { WardRepository } from '../repository/ward.repository';

const relationshipNames = [];
    relationshipNames.push('district');


@Injectable()
export class WardService {
    logger = new Logger('WardService');

    constructor(@InjectRepository(WardRepository) private wardRepository: WardRepository) {}

      async findById(id: number): Promise<WardDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.wardRepository.findOne(id, options);
        return WardMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<WardDTO>): Promise<WardDTO | undefined> {
        const result = await this.wardRepository.findOne(options);
        return WardMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<WardDTO>): Promise<[WardDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.wardRepository.findAndCount(options);
        const wardDTO: WardDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(ward => wardDTO.push(WardMapper.fromEntityToDTO(ward)));
            resultList[0] = wardDTO;
        }
        return resultList;
      }

      async save(wardDTO: WardDTO, creator?: string): Promise<WardDTO | undefined> {
        const entity = WardMapper.fromDTOtoEntity(wardDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.wardRepository.save(entity);
        return WardMapper.fromEntityToDTO(result);
      }

      async update(wardDTO: WardDTO, updater?: string): Promise<WardDTO | undefined> {
        const entity = WardMapper.fromDTOtoEntity(wardDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.wardRepository.save(entity);
        return WardMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.wardRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
