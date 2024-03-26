import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProfileDTO } from '../../service/dto/profile.dto';
import { ProfileService } from '../../service/profile.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';


@Controller('api/profiles')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('profiles')
export class ProfileController {
  logger = new Logger('ProfileController');

  constructor(private readonly profileService: ProfileService) { }


  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ProfileDTO,
  })
  async getAll(@Req() req: Request): Promise<ProfileDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.profileService.findAndCount({
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
    type: ProfileDTO,
  })
  async getOne(@Param('id') id: number): Promise<ProfileDTO> {
    return await this.profileService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create profile' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ProfileDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profileDTO: ProfileDTO): Promise<ProfileDTO> {
    const created = await this.profileService.save(profileDTO, req.user?.email);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Profile', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update profile' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfileDTO,
  })
  async put(@Req() req: Request, @Body() profileDTO: ProfileDTO): Promise<ProfileDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Profile', profileDTO.id);
    return await this.profileService.update(profileDTO, req.user?.email);
  }

  @Put('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update profile with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ProfileDTO,
  })
  async putId(@Req() req: Request, @Body() profileDTO: ProfileDTO): Promise<ProfileDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Profile', profileDTO.id);
    return await this.profileService.update(profileDTO, req.user?.email);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete profile' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Profile', id);
    return await this.profileService.deleteById(id);
  }
}
