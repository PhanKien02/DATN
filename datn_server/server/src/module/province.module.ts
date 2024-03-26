import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinceController } from '../web/rest/province.controller';
import { ProvinceRepository } from '../repository/province.repository';
import { ProvinceService } from '../service/province.service';


@Module({
  imports: [TypeOrmModule.forFeature([ProvinceRepository])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [ProvinceService],
})
export class ProvinceModule {}
