/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { DistrictDTO } from './district.dto';


/**
 * A ProvinceDTO object.
 */
export class ProvinceDTO extends BaseDTO {

            @ApiModelProperty({description: 'name field', required: false})
        name: string;


         @ApiModelProperty({ type: DistrictDTO, isArray: true,description: 'districts relationship'})
        districts: DistrictDTO[];

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
