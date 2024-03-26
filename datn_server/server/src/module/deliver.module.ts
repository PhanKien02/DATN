import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverController } from '../web/rest/deliver.controller';
import { DeliverRepository } from '../repository/deliver.repository';
import { DeliverService } from '../service/deliver.service';


@Module({
  imports: [TypeOrmModule.forFeature([DeliverRepository])],
  controllers: [DeliverController],
  providers: [DeliverService],
  exports: [DeliverService],
})
export class DeliverModule {}
