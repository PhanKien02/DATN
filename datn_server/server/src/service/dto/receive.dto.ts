/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';


import { DetailReceiveDTO } from './detail-receive.dto';
import { ProfileDTO } from './profile.dto';


/**
 * A ReceiveDTO object.
 */
export class ReceiveDTO extends BaseDTO {

            @ApiModelProperty({description: 'dates field', required: false})
        dates: any;

            @ApiModelProperty({description: 'status field', required: false})
        status: boolean;

            @ApiModelProperty({description: 'delivererName field', required: false})
        delivererName: string;


         @ApiModelProperty({ type: DetailReceiveDTO, isArray: true,description: 'detailReceives relationship'})
        detailReceives: DetailReceiveDTO[];

        @ApiModelProperty({ type: ProfileDTO,description: 'profile relationship'})
        profile: ProfileDTO;

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    }
