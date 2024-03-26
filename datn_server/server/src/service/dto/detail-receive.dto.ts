/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { ReceiveDTO } from './receive.dto';
import { ProductDTO } from './product.dto';
import { Unit } from '../../domain/enumeration/unit';


/**
 * A DetailReceiveDTO object.
 */
export class DetailReceiveDTO extends BaseDTO {

            @ApiModelProperty({description: 'price field', required: false})
        price: number;

            @ApiModelProperty({description: 'amount field', required: false})
        amount: number;

            @ApiModelProperty({ enum: Unit,description: 'unit enum field', required: false})
        unit: Unit;


        @ApiModelProperty({ type: ReceiveDTO,description: 'receive relationship'})
        receive: ReceiveDTO;

        @ApiModelProperty({ type: ProductDTO,description: 'product relationship'})
        product: ProductDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
