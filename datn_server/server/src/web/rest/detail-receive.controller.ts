import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DetailReceiveDTO } from '../../service/dto/detail-receive.dto';
import { DetailReceiveService } from '../../service/detail-receive.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/detail-receives')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('detail-receives')
export class DetailReceiveController {
  logger = new Logger('DetailReceiveController');

  constructor(private readonly detailReceiveService: DetailReceiveService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DetailReceiveDTO,
  })
  async getAll(@Req() req: Request): Promise<DetailReceiveDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.detailReceiveService.findAndCount({
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
    type: DetailReceiveDTO,
  })
  async getOne(@Param('id') id: number): Promise<DetailReceiveDTO> {
    return await this.detailReceiveService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create detailReceive' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DetailReceiveDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() detailReceiveDTO: DetailReceiveDTO): Promise<DetailReceiveDTO> {
    const created = await this.detailReceiveService.save(detailReceiveDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DetailReceive', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update detailReceive' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DetailReceiveDTO,
  })
  async put(@Req() req: Request, @Body() detailReceiveDTO: DetailReceiveDTO): Promise<DetailReceiveDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DetailReceive', detailReceiveDTO.id);
    return await this.detailReceiveService.update(detailReceiveDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update detailReceive with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DetailReceiveDTO,
  })
  async putId(@Req() req: Request, @Body() detailReceiveDTO: DetailReceiveDTO): Promise<DetailReceiveDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DetailReceive', detailReceiveDTO.id);
    return await this.detailReceiveService.update(detailReceiveDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete detailReceive' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'DetailReceive', id);
    return await this.detailReceiveService.deleteById(id);
  }
}
