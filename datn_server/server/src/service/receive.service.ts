import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ReceiveDTO }  from '../service/dto/receive.dto';
import { ReceiveMapper }  from '../service/mapper/receive.mapper';
import { ReceiveRepository } from '../repository/receive.repository';

const relationshipNames = [];
    relationshipNames.push('profile');


@Injectable()
export class ReceiveService {
    logger = new Logger('ReceiveService');

    constructor(@InjectRepository(ReceiveRepository) private receiveRepository: ReceiveRepository) {}

      async findById(id: number): Promise<ReceiveDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.receiveRepository.findOne(id, options);
        return ReceiveMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<ReceiveDTO>): Promise<ReceiveDTO | undefined> {
        const result = await this.receiveRepository.findOne(options);
        return ReceiveMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<ReceiveDTO>): Promise<[ReceiveDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.receiveRepository.findAndCount(options);
        const receiveDTO: ReceiveDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(receive => receiveDTO.push(ReceiveMapper.fromEntityToDTO(receive)));
            resultList[0] = receiveDTO;
        }
        return resultList;
      }

      async save(receiveDTO: ReceiveDTO, creator?: string): Promise<ReceiveDTO | undefined> {
        const entity = ReceiveMapper.fromDTOtoEntity(receiveDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.receiveRepository.save(entity);
        return ReceiveMapper.fromEntityToDTO(result);
      }

      async update(receiveDTO: ReceiveDTO, updater?: string): Promise<ReceiveDTO | undefined> {
        const entity = ReceiveMapper.fromDTOtoEntity(receiveDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.receiveRepository.save(entity);
        return ReceiveMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.receiveRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
