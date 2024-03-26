import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AreaDTO } from '../../service/dto/area.dto';
import { AreaService } from '../../service/area.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/areas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('areas')
export class AreaController {
  logger = new Logger('AreaController');

  constructor(private readonly areaService: AreaService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AreaDTO,
  })
  async getAll(@Req() req: Request): Promise<AreaDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.areaService.findAndCount({
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
    type: AreaDTO,
  })
  async getOne(@Param('id') id: number): Promise<AreaDTO> {
    return await this.areaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create area' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AreaDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() areaDTO: AreaDTO): Promise<AreaDTO> {
    const created = await this.areaService.save(areaDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Area', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update area' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AreaDTO,
  })
  async put(@Req() req: Request, @Body() areaDTO: AreaDTO): Promise<AreaDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Area', areaDTO.id);
    return await this.areaService.update(areaDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update area with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AreaDTO,
  })
  async putId(@Req() req: Request, @Body() areaDTO: AreaDTO): Promise<AreaDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Area', areaDTO.id);
    return await this.areaService.update(areaDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete area' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Area', id);
    return await this.areaService.deleteById(id);
  }
}
