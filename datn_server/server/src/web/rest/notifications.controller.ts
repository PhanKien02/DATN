import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { NotificationsDTO } from '../../service/dto/notifications.dto';
import { NotificationsService } from '../../service/notifications.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/notifications')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('notifications')
export class NotificationsController {
  logger = new Logger('NotificationsController');

  constructor(private readonly notificationsService: NotificationsService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: NotificationsDTO,
  })
  async getAll(@Req() req: Request): Promise<NotificationsDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.notificationsService.findAndCount({
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
    type: NotificationsDTO,
  })
  async getOne(@Param('id') id: number): Promise<NotificationsDTO> {
    return await this.notificationsService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create notifications' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: NotificationsDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() notificationsDTO: NotificationsDTO): Promise<NotificationsDTO> {
    const created = await this.notificationsService.save(notificationsDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Notifications', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update notifications' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: NotificationsDTO,
  })
  async put(@Req() req: Request, @Body() notificationsDTO: NotificationsDTO): Promise<NotificationsDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Notifications', notificationsDTO.id);
    return await this.notificationsService.update(notificationsDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update notifications with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: NotificationsDTO,
  })
  async putId(@Req() req: Request, @Body() notificationsDTO: NotificationsDTO): Promise<NotificationsDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Notifications', notificationsDTO.id);
    return await this.notificationsService.update(notificationsDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete notifications' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Notifications', id);
    return await this.notificationsService.deleteById(id);
  }
}
