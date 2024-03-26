import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeProductController } from '../web/rest/type-product.controller';
import { TypeProductRepository } from '../repository/type-product.repository';
import { TypeProductService } from '../service/type-product.service';


@Module({
  imports: [TypeOrmModule.forFeature([TypeProductRepository])],
  controllers: [TypeProductController],
  providers: [TypeProductService],
  exports: [TypeProductService],
})
export class TypeProductModule {}
