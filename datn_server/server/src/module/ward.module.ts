import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardController } from '../web/rest/ward.controller';
import { WardRepository } from '../repository/ward.repository';
import { WardService } from '../service/ward.service';


@Module({
  imports: [TypeOrmModule.forFeature([WardRepository])],
  controllers: [WardController],
  providers: [WardService],
  exports: [WardService],
})
export class WardModule {}
