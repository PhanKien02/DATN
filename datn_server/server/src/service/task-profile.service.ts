import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TaskProfileDTO }  from '../service/dto/task-profile.dto';
import { TaskProfileMapper }  from '../service/mapper/task-profile.mapper';
import { TaskProfileRepository } from '../repository/task-profile.repository';

const relationshipNames = [];
    relationshipNames.push('task');
    relationshipNames.push('profile');


@Injectable()
export class TaskProfileService {
    logger = new Logger('TaskProfileService');

    constructor(@InjectRepository(TaskProfileRepository) private taskProfileRepository: TaskProfileRepository) {}

      async findById(id: number): Promise<TaskProfileDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.taskProfileRepository.findOne(id, options);
        return TaskProfileMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<TaskProfileDTO>): Promise<TaskProfileDTO | undefined> {
        const result = await this.taskProfileRepository.findOne(options);
        return TaskProfileMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<TaskProfileDTO>): Promise<[TaskProfileDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.taskProfileRepository.findAndCount(options);
        const taskProfileDTO: TaskProfileDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(taskProfile => taskProfileDTO.push(TaskProfileMapper.fromEntityToDTO(taskProfile)));
            resultList[0] = taskProfileDTO;
        }
        return resultList;
      }

      async save(taskProfileDTO: TaskProfileDTO, creator?: string): Promise<TaskProfileDTO | undefined> {
        const entity = TaskProfileMapper.fromDTOtoEntity(taskProfileDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.taskProfileRepository.save(entity);
        return TaskProfileMapper.fromEntityToDTO(result);
      }

      async update(taskProfileDTO: TaskProfileDTO, updater?: string): Promise<TaskProfileDTO | undefined> {
        const entity = TaskProfileMapper.fromDTOtoEntity(taskProfileDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.taskProfileRepository.save(entity);
        return TaskProfileMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.taskProfileRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
