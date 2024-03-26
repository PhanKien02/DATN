import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { DistrictDTO } from '../../service/dto/district.dto';
import { DistrictService } from '../../service/district.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/districts')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('districts')
export class DistrictController {
  logger = new Logger('DistrictController');

  constructor(private readonly districtService: DistrictService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DistrictDTO,
  })
  async getAll(@Req() req: Request): Promise<DistrictDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.districtService.findAndCount({
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
    type: DistrictDTO,
  })
  async getOne(@Param('id') id: number): Promise<DistrictDTO> {
    return await this.districtService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create district' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DistrictDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() districtDTO: DistrictDTO): Promise<DistrictDTO> {
    const created = await this.districtService.save(districtDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'District', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update district' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DistrictDTO,
  })
  async put(@Req() req: Request, @Body() districtDTO: DistrictDTO): Promise<DistrictDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'District', districtDTO.id);
    return await this.districtService.update(districtDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update district with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DistrictDTO,
  })
  async putId(@Req() req: Request, @Body() districtDTO: DistrictDTO): Promise<DistrictDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'District', districtDTO.id);
    return await this.districtService.update(districtDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete district' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'District', id);
    return await this.districtService.deleteById(id);
  }
}
