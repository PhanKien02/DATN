import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from '../web/rest/notifications.controller';
import { NotificationsRepository } from '../repository/notifications.repository';
import { NotificationsService } from '../service/notifications.service';


@Module({
  imports: [TypeOrmModule.forFeature([NotificationsRepository])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
