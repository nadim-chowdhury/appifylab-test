import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UsersByIdsDto {
  @ApiProperty({
    example: ['clh1234567890abcdef', 'clh0987654321fedcba'],
    description: 'Array of user IDs',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  userIds: string[];
}
