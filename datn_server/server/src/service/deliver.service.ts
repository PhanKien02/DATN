import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DeliverDTO }  from '../service/dto/deliver.dto';
import { DeliverMapper }  from '../service/mapper/deliver.mapper';
import { DeliverRepository } from '../repository/deliver.repository';

const relationshipNames = [];
    relationshipNames.push('profile');


@Injectable()
export class DeliverService {
    logger = new Logger('DeliverService');

    constructor(@InjectRepository(DeliverRepository) private deliverRepository: DeliverRepository) {}

      async findById(id: number): Promise<DeliverDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.deliverRepository.findOne(id, options);
        return DeliverMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<DeliverDTO>): Promise<DeliverDTO | undefined> {
        const result = await this.deliverRepository.findOne(options);
        return DeliverMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<DeliverDTO>): Promise<[DeliverDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.deliverRepository.findAndCount(options);
        const deliverDTO: DeliverDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(deliver => deliverDTO.push(DeliverMapper.fromEntityToDTO(deliver)));
            resultList[0] = deliverDTO;
        }
        return resultList;
      }

      async save(deliverDTO: DeliverDTO, creator?: string): Promise<DeliverDTO | undefined> {
        const entity = DeliverMapper.fromDTOtoEntity(deliverDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.deliverRepository.save(entity);
        return DeliverMapper.fromEntityToDTO(result);
      }

      async update(deliverDTO: DeliverDTO, updater?: string): Promise<DeliverDTO | undefined> {
        const entity = DeliverMapper.fromDTOtoEntity(deliverDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.deliverRepository.save(entity);
        return DeliverMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.deliverRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
