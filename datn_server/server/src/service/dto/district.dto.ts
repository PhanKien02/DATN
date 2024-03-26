/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { WardDTO } from './ward.dto';
import { ProvinceDTO } from './province.dto';


/**
 * A DistrictDTO object.
 */
export class DistrictDTO extends BaseDTO {

            @ApiModelProperty({description: 'name field', required: false})
        name: string;


         @ApiModelProperty({ type: WardDTO, isArray: true,description: 'wards relationship'})
        wards: WardDTO[];

        @ApiModelProperty({ type: ProvinceDTO,description: 'province relationship'})
        province: ProvinceDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
