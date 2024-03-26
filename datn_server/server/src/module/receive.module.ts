import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiveController } from '../web/rest/receive.controller';
import { ReceiveRepository } from '../repository/receive.repository';
import { ReceiveService } from '../service/receive.service';


@Module({
  imports: [TypeOrmModule.forFeature([ReceiveRepository])],
  controllers: [ReceiveController],
  providers: [ReceiveService],
  exports: [ReceiveService],
})
export class ReceiveModule {}
