/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { DetailDeliverDTO } from './detail-deliver.dto';
import { DetailReceiveDTO } from './detail-receive.dto';
import { AreaDTO } from './area.dto';
import { TypeProductDTO } from './type-product.dto';


/**
 * A ProductDTO object.
 */
export class ProductDTO extends BaseDTO {

            @ApiModelProperty({description: 'name field', required: false})
        name: string;

            @ApiModelProperty({description: 'amount field', required: false})
        amount: number;

            @ApiModelProperty({description: 'status field', required: false})
        status: boolean;


         @ApiModelProperty({ type: DetailDeliverDTO, isArray: true,description: 'detailDelivers relationship'})
        detailDelivers: DetailDeliverDTO[];

         @ApiModelProperty({ type: DetailReceiveDTO, isArray: true,description: 'detailReceives relationship'})
        detailReceives: DetailReceiveDTO[];

        @ApiModelProperty({ type: AreaDTO,description: 'area relationship'})
        area: AreaDTO;

        @ApiModelProperty({ type: TypeProductDTO,description: 'typeProduct relationship'})
        typeProduct: TypeProductDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
