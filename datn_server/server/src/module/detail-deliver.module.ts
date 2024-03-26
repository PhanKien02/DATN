import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailDeliverController } from '../web/rest/detail-deliver.controller';
import { DetailDeliverRepository } from '../repository/detail-deliver.repository';
import { DetailDeliverService } from '../service/detail-deliver.service';


@Module({
  imports: [TypeOrmModule.forFeature([DetailDeliverRepository])],
  controllers: [DetailDeliverController],
  providers: [DetailDeliverService],
  exports: [DetailDeliverService],
})
export class DetailDeliverModule {}
