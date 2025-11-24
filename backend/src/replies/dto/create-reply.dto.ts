import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateReplyDto {
  @ApiProperty({
    description: 'ID of the comment to reply to',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  commentId: string;

  @ApiProperty({
    description: 'Reply content',
    example: 'Thanks for your comment!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
