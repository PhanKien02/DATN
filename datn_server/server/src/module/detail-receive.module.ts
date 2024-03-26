import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailReceiveController } from '../web/rest/detail-receive.controller';
import { DetailReceiveRepository } from '../repository/detail-receive.repository';
import { DetailReceiveService } from '../service/detail-receive.service';


@Module({
  imports: [TypeOrmModule.forFeature([DetailReceiveRepository])],
  controllers: [DetailReceiveController],
  providers: [DetailReceiveService],
  exports: [DetailReceiveService],
})
export class DetailReceiveModule {}
