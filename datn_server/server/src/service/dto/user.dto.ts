import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';
import { BaseDTO } from './base.dto';
import { Exclude } from 'class-transformer';

/**
 * An User DTO object.
 */
export class UserDTO extends BaseDTO {
  @ApiModelProperty({ uniqueItems: true, example: 'myuser', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiModelProperty({ example: 'true', description: 'User activation', required: false })
  activated?: boolean;

  @ApiModelProperty({
    isArray: true,
    enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ANONYMOUS'],
    description: 'Array of permissions',
    required: false,
  })
  authorities?: any[];

  @Exclude()
  @ApiModelProperty({ example: 'myuser', description: 'User password' })
  password: string;

  activationKey?: string;

  resetKey?: string;

  resetDate?: Date;
}
