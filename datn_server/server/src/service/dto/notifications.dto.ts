/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';




/**
 * A NotificationsDTO object.
 */
export class NotificationsDTO extends BaseDTO {

            @ApiModelProperty({description: 'title field', required: false})
        title: string;

            @ApiModelProperty({description: 'content field', required: false})
        content: string;


        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
