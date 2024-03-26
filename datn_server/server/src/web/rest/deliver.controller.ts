import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DeliverDTO } from '../../service/dto/deliver.dto';
import { DeliverService } from '../../service/deliver.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/delivers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('delivers')
export class DeliverController {
  logger = new Logger('DeliverController');

  constructor(private readonly deliverService: DeliverService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DeliverDTO,
  })
  async getAll(@Req() req: Request): Promise<DeliverDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.deliverService.findAndCount({
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
    type: DeliverDTO,
  })
  async getOne(@Param('id') id: number): Promise<DeliverDTO> {
    return await this.deliverService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create deliver' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DeliverDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() deliverDTO: DeliverDTO): Promise<DeliverDTO> {
    const created = await this.deliverService.save(deliverDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Deliver', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update deliver' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DeliverDTO,
  })
  async put(@Req() req: Request, @Body() deliverDTO: DeliverDTO): Promise<DeliverDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Deliver', deliverDTO.id);
    return await this.deliverService.update(deliverDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update deliver with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DeliverDTO,
  })
  async putId(@Req() req: Request, @Body() deliverDTO: DeliverDTO): Promise<DeliverDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Deliver', deliverDTO.id);
    return await this.deliverService.update(deliverDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete deliver' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Deliver', id);
    return await this.deliverService.deleteById(id);
  }
}
