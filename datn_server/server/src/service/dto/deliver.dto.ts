/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { DetailDeliverDTO } from './detail-deliver.dto';
import { ProfileDTO } from './profile.dto';


/**
 * A DeliverDTO object.
 */
export class DeliverDTO extends BaseDTO {

            @ApiModelProperty({description: 'dates field', required: false})
        dates: any;

            @ApiModelProperty({description: 'status field', required: false})
        status: boolean;


         @ApiModelProperty({ type: DetailDeliverDTO, isArray: true,description: 'detailDelivers relationship'})
        detailDelivers: DetailDeliverDTO[];

        @ApiModelProperty({ type: ProfileDTO,description: 'profile relationship'})
        profile: ProfileDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
