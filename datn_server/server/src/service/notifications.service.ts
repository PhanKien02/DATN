import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { NotificationsDTO }  from '../service/dto/notifications.dto';
import { NotificationsMapper }  from '../service/mapper/notifications.mapper';
import { NotificationsRepository } from '../repository/notifications.repository';

const relationshipNames = [];


@Injectable()
export class NotificationsService {
    logger = new Logger('NotificationsService');

    constructor(@InjectRepository(NotificationsRepository) private notificationsRepository: NotificationsRepository) {}

      async findById(id: number): Promise<NotificationsDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.notificationsRepository.findOne(id, options);
        return NotificationsMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<NotificationsDTO>): Promise<NotificationsDTO | undefined> {
        const result = await this.notificationsRepository.findOne(options);
        return NotificationsMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<NotificationsDTO>): Promise<[NotificationsDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.notificationsRepository.findAndCount(options);
        const notificationsDTO: NotificationsDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(notifications => notificationsDTO.push(NotificationsMapper.fromEntityToDTO(notifications)));
            resultList[0] = notificationsDTO;
        }
        return resultList;
      }

      async save(notificationsDTO: NotificationsDTO, creator?: string): Promise<NotificationsDTO | undefined> {
        const entity = NotificationsMapper.fromDTOtoEntity(notificationsDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.notificationsRepository.save(entity);
        return NotificationsMapper.fromEntityToDTO(result);
      }

      async update(notificationsDTO: NotificationsDTO, updater?: string): Promise<NotificationsDTO | undefined> {
        const entity = NotificationsMapper.fromDTOtoEntity(notificationsDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.notificationsRepository.save(entity);
        return NotificationsMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.notificationsRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
