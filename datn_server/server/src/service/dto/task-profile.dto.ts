/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { TaskDTO } from './task.dto';
import { ProfileDTO } from './profile.dto';


/**
 * A TaskProfileDTO object.
 */
export class TaskProfileDTO extends BaseDTO {

            @ApiModelProperty({description: 'dates field', required: false})
        dates: any;


        @ApiModelProperty({ type: TaskDTO,description: 'task relationship'})
        task: TaskDTO;

        @ApiModelProperty({ type: ProfileDTO,description: 'profile relationship'})
        profile: ProfileDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
