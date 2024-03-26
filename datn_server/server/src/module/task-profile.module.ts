import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskProfileController } from '../web/rest/task-profile.controller';
import { TaskProfileRepository } from '../repository/task-profile.repository';
import { TaskProfileService } from '../service/task-profile.service';


@Module({
  imports: [TypeOrmModule.forFeature([TaskProfileRepository])],
  controllers: [TaskProfileController],
  providers: [TaskProfileService],
  exports: [TaskProfileService],
})
export class TaskProfileModule {}
