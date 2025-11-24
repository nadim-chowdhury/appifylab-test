import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'ID of the post to comment on',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @ApiProperty({
    description: 'Comment content',
    example: 'This is a great post!',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
