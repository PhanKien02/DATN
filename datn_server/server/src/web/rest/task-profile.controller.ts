import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TaskProfileDTO } from '../../service/dto/task-profile.dto';
import { TaskProfileService } from '../../service/task-profile.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/task-profiles')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('task-profiles')
export class TaskProfileController {
  logger = new Logger('TaskProfileController');

  constructor(private readonly taskProfileService: TaskProfileService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TaskProfileDTO,
  })
  async getAll(@Req() req: Request): Promise<TaskProfileDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.taskProfileService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: TaskProfileDTO,
  })
  async getOne(@Param('id') id: number): Promise<TaskProfileDTO> {
    return await this.taskProfileService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create taskProfile' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TaskProfileDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() taskProfileDTO: TaskProfileDTO): Promise<TaskProfileDTO> {
    const created = await this.taskProfileService.save(taskProfileDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TaskProfile', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update taskProfile' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TaskProfileDTO,
  })
  async put(@Req() req: Request, @Body() taskProfileDTO: TaskProfileDTO): Promise<TaskProfileDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TaskProfile', taskProfileDTO.id);
    return await this.taskProfileService.update(taskProfileDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update taskProfile with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TaskProfileDTO,
  })
  async putId(@Req() req: Request, @Body() taskProfileDTO: TaskProfileDTO): Promise<TaskProfileDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TaskProfile', taskProfileDTO.id);
    return await this.taskProfileService.update(taskProfileDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete taskProfile' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TaskProfile', id);
    return await this.taskProfileService.deleteById(id);
  }
}
