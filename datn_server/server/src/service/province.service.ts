import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ProvinceDTO }  from '../service/dto/province.dto';
import { ProvinceMapper }  from '../service/mapper/province.mapper';
import { ProvinceRepository } from '../repository/province.repository';

const relationshipNames = [];


@Injectable()
export class ProvinceService {
    logger = new Logger('ProvinceService');

    constructor(@InjectRepository(ProvinceRepository) private provinceRepository: ProvinceRepository) {}

      async findById(id: number): Promise<ProvinceDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.provinceRepository.findOne(id, options);
        return ProvinceMapper.fromEntityToDTO(result);
      }

      async findByFields(options: FindOneOptions<ProvinceDTO>): Promise<ProvinceDTO | undefined> {
        const result = await this.provinceRepository.findOne(options);
        return ProvinceMapper.fromEntityToDTO(result);
      }

      async findAndCount(options: FindManyOptions<ProvinceDTO>): Promise<[ProvinceDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.provinceRepository.findAndCount(options);
        const provinceDTO: ProvinceDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(province => provinceDTO.push(ProvinceMapper.fromEntityToDTO(province)));
            resultList[0] = provinceDTO;
        }
        return resultList;
      }

      async save(provinceDTO: ProvinceDTO, creator?: string): Promise<ProvinceDTO | undefined> {
        const entity = ProvinceMapper.fromDTOtoEntity(provinceDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.provinceRepository.save(entity);
        return ProvinceMapper.fromEntityToDTO(result);
      }

      async update(provinceDTO: ProvinceDTO, updater?: string): Promise<ProvinceDTO | undefined> {
        const entity = ProvinceMapper.fromDTOtoEntity(provinceDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.provinceRepository.save(entity);
        return ProvinceMapper.fromEntityToDTO(result);
      }

      async deleteById(id: number): Promise<void | undefined> {
        await this.provinceRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
          throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
      }

}
