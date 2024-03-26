import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DetailDeliverDTO } from '../../service/dto/detail-deliver.dto';
import { DetailDeliverService } from '../../service/detail-deliver.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/detail-delivers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('detail-delivers')
export class DetailDeliverController {
  logger = new Logger('DetailDeliverController');

  constructor(private readonly detailDeliverService: DetailDeliverService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DetailDeliverDTO,
  })
  async getAll(@Req() req: Request): Promise<DetailDeliverDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.detailDeliverService.findAndCount({
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
    type: DetailDeliverDTO,
  })
  async getOne(@Param('id') id: number): Promise<DetailDeliverDTO> {
    return await this.detailDeliverService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create detailDeliver' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DetailDeliverDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() detailDeliverDTO: DetailDeliverDTO): Promise<DetailDeliverDTO> {
    const created = await this.detailDeliverService.save(detailDeliverDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DetailDeliver', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update detailDeliver' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DetailDeliverDTO,
  })
  async put(@Req() req: Request, @Body() detailDeliverDTO: DetailDeliverDTO): Promise<DetailDeliverDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DetailDeliver', detailDeliverDTO.id);
    return await this.detailDeliverService.update(detailDeliverDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update detailDeliver with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DetailDeliverDTO,
  })
  async putId(@Req() req: Request, @Body() detailDeliverDTO: DetailDeliverDTO): Promise<DetailDeliverDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DetailDeliver', detailDeliverDTO.id);
    return await this.detailDeliverService.update(detailDeliverDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete detailDeliver' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'DetailDeliver', id);
    return await this.detailDeliverService.deleteById(id);
  }
}
