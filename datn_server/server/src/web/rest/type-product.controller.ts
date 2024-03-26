import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TypeProductDTO } from '../../service/dto/type-product.dto';
import { TypeProductService } from '../../service/type-product.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/type-products')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('type-products')
export class TypeProductController {
  logger = new Logger('TypeProductController');

  constructor(private readonly typeProductService: TypeProductService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TypeProductDTO,
  })
  async getAll(@Req() req: Request): Promise<TypeProductDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.typeProductService.findAndCount({
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
    type: TypeProductDTO,
  })
  async getOne(@Param('id') id: number): Promise<TypeProductDTO> {
    return await this.typeProductService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create typeProduct' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TypeProductDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() typeProductDTO: TypeProductDTO): Promise<TypeProductDTO> {
    const created = await this.typeProductService.save(typeProductDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TypeProduct', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update typeProduct' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TypeProductDTO,
  })
  async put(@Req() req: Request, @Body() typeProductDTO: TypeProductDTO): Promise<TypeProductDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TypeProduct', typeProductDTO.id);
    return await this.typeProductService.update(typeProductDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update typeProduct with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TypeProductDTO,
  })
  async putId(@Req() req: Request, @Body() typeProductDTO: TypeProductDTO): Promise<TypeProductDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TypeProduct', typeProductDTO.id);
    return await this.typeProductService.update(typeProductDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete typeProduct' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TypeProduct', id);
    return await this.typeProductService.deleteById(id);
  }
}
