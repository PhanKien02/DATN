import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaController } from '../web/rest/area.controller';
import { AreaRepository } from '../repository/area.repository';
import { AreaService } from '../service/area.service';


@Module({
  imports: [TypeOrmModule.forFeature([AreaRepository])],
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
