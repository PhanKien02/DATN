import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ReceiveDTO } from '../../service/dto/receive.dto';
import { ReceiveService } from '../../service/receive.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/receives')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('receives')
export class ReceiveController {
  logger = new Logger('ReceiveController');

  constructor(private readonly receiveService: ReceiveService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ReceiveDTO,
  })
  async getAll(@Req() req: Request): Promise<ReceiveDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.receiveService.findAndCount({
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
    type: ReceiveDTO,
  })
  async getOne(@Param('id') id: number): Promise<ReceiveDTO> {
    return await this.receiveService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create receive' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ReceiveDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() receiveDTO: ReceiveDTO): Promise<ReceiveDTO> {
    const created = await this.receiveService.save(receiveDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Receive', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update receive' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ReceiveDTO,
  })
  async put(@Req() req: Request, @Body() receiveDTO: ReceiveDTO): Promise<ReceiveDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Receive', receiveDTO.id);
    return await this.receiveService.update(receiveDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update receive with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ReceiveDTO,
  })
  async putId(@Req() req: Request, @Body() receiveDTO: ReceiveDTO): Promise<ReceiveDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Receive', receiveDTO.id);
    return await this.receiveService.update(receiveDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete receive' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Receive', id);
    return await this.receiveService.deleteById(id);
  }
}
