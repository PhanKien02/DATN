/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { TaskProfileDTO } from './task-profile.dto';


/**
 * A TaskDTO object.
 */
export class TaskDTO extends BaseDTO {

            @ApiModelProperty({description: 'title field', required: false})
        title: string;

            @ApiModelProperty({description: 'description field', required: false})
        description: string;


         @ApiModelProperty({ type: TaskProfileDTO, isArray: true,description: 'taskProfiles relationship'})
        taskProfiles: TaskProfileDTO[];

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
