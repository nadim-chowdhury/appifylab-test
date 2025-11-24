import { ApiProperty } from '@nestjs/swagger';

export class ReplyUserDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;
}

export class ReplyCountDto {
  @ApiProperty({ example: 2 })
  likes: number;
}

export class ReplyResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'This is a reply' })
  content: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  commentId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ type: ReplyUserDto })
  user: ReplyUserDto;

  @ApiProperty({ type: ReplyCountDto })
  _count: ReplyCountDto;

  @ApiProperty({ example: '2025-11-24T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-11-24T10:00:00.000Z' })
  updatedAt: Date;
}

export class DeleteReplyResponseDto {
  @ApiProperty({ example: 'Reply deleted successfully' })
  message: string;
}
