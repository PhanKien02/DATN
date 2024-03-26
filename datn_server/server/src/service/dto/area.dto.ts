/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { ProductDTO } from './product.dto';
import { ProfileDTO } from './profile.dto';


/**
 * A AreaDTO object.
 */
export class AreaDTO extends BaseDTO {

            @ApiModelProperty({description: 'name field', required: false})
        name: string;

            @ApiModelProperty({description: 'area field', required: false})
        area: number;


         @ApiModelProperty({ type: ProductDTO, isArray: true,description: 'products relationship'})
        products: ProductDTO[];

         @ApiModelProperty({ type: ProfileDTO, isArray: true,description: 'profiles relationship'})
        profiles: ProfileDTO[];

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
