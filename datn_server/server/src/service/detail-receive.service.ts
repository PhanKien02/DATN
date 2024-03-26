import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { DetailReceiveDTO }  from '../service/dto/detail-receive.dto';
import { DetailReceiveMapper }  from '../service/mapper/detail-receive.mapper';
import { DetailReceiveRepository } from '../repository/detail-receive.repository';

const relationshipNames = [];
    relationshipNames.push('receive');
    relationshipNames.push('product');


@Injectable()
export class DetailReceiveService {
    logger = new Logger('DetailReceiveService');

    constructor(@InjectRepository(DetailReceiveRepository) private detailReceiveRepository: DetailReceiveRepository) {}

      async findById(id: number): Promise<DetailReceiveDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.detailReceiveRepository.findOne(id, options);
        return DetailReceiveMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<DetailReceiveDTO>): Promise<DetailReceiveDTO | undefined> {
        const result = await this.detailReceiveRepository.findOne(options);
        return DetailReceiveMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<DetailReceiveDTO>): Promise<[DetailReceiveDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.detailReceiveRepository.findAndCount(options);
        const detailReceiveDTO: DetailReceiveDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(detailReceive => detailReceiveDTO.push(DetailReceiveMapper.fromEntityToDTO(detailReceive)));
            resultList[0] = detailReceiveDTO;
        }
        return resultList;
      }

      async save(detailReceiveDTO: DetailReceiveDTO, creator?: string): Promise<DetailReceiveDTO | undefined> {
        const entity = DetailReceiveMapper.fromDTOtoEntity(detailReceiveDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.detailReceiveRepository.save(entity);
        return DetailReceiveMapper.fromEntityToDTO(result);
      }

      async update(detailReceiveDTO: DetailReceiveDTO, updater?: string): Promise<DetailReceiveDTO | undefined> {
        const entity = DetailReceiveMapper.fromDTOtoEntity(detailReceiveDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.detailReceiveRepository.save(entity);
        return DetailReceiveMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.detailReceiveRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
