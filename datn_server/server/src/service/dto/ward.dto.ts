/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { ProfileDTO } from './profile.dto';
import { DistrictDTO } from './district.dto';


/**
 * A WardDTO object.
 */
export class WardDTO extends BaseDTO {

            @ApiModelProperty({description: 'name field', required: false})
        name: string;


         @ApiModelProperty({ type: ProfileDTO, isArray: true,description: 'profiles relationship'})
        profiles: ProfileDTO[];

        @ApiModelProperty({ type: DistrictDTO,description: 'district relationship'})
        district: DistrictDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
