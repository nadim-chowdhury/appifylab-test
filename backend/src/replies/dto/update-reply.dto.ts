import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateReplyDto {
  @ApiProperty({
    description: 'Updated reply content',
    example: 'This is an updated reply',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
