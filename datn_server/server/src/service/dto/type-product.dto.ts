/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { ProductDTO } from './product.dto';


/**
 * A TypeProductDTO object.
 */
export class TypeProductDTO extends BaseDTO {

            @ApiModelProperty({description: 'name field', required: false})
        name: string;

            @ApiModelProperty({description: 'description field', required: false})
        description: string;


         @ApiModelProperty({ type: ProductDTO, isArray: true,description: 'products relationship'})
        products: ProductDTO[];

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
