/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { TaskProfileDTO } from './task-profile.dto';
import { DeliverDTO } from './deliver.dto';
import { ReceiveDTO } from './receive.dto';
import { WardDTO } from './ward.dto';
import { AreaDTO } from './area.dto';

import { UserDTO } from './user.dto';

/**
 * A ProfileDTO object.
 */
export class ProfileDTO extends BaseDTO {

            @ApiModelProperty({description: 'fullName field', required: false})
        fullName: string;

            @ApiModelProperty({description: 'phone field', required: false})
        phone: string;

            @ApiModelProperty({description: 'gender field', required: false})
        gender: boolean;

            @ApiModelProperty({description: 'dob field', required: false})
        dob: any;

            @ApiModelProperty({description: 'avatar field', required: false})
        avatar: string;


        @ApiModelProperty({ type: UserDTO,description: 'user relationship'})
        user: UserDTO;

         @ApiModelProperty({ type: TaskProfileDTO, isArray: true,description: 'taskProfiles relationship'})
        taskProfiles: TaskProfileDTO[];

         @ApiModelProperty({ type: DeliverDTO, isArray: true,description: 'delivers relationship'})
        delivers: DeliverDTO[];

         @ApiModelProperty({ type: ReceiveDTO, isArray: true,description: 'receives relationship'})
        receives: ReceiveDTO[];

        @ApiModelProperty({ type: WardDTO,description: 'ward relationship'})
        ward: WardDTO;

        @ApiModelProperty({ type: AreaDTO,description: 'area relationship'})
        area: AreaDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
