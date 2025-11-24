import { ApiProperty } from '@nestjs/swagger';

export class CommentUserDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;
}

export class CommentLikeDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ type: CommentUserDto })
  user: CommentUserDto;

  @ApiProperty({ example: '2025-11-24T10:00:00.000Z' })
  createdAt: Date;
}

export class ReplyDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'This is a reply' })
  content: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  commentId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ type: CommentUserDto })
  user: CommentUserDto;

  @ApiProperty({ type: [CommentLikeDto] })
  likes: CommentLikeDto[];

  @ApiProperty({ example: true })
  isLiked: boolean;

  @ApiProperty({ example: '2025-11-24T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-11-24T10:00:00.000Z' })
  updatedAt: Date;
}

export class CommentCountDto {
  @ApiProperty({ example: 5 })
  likes: number;

  @ApiProperty({ example: 3 })
  replies: number;
}

export class CommentResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'This is a comment' })
  content: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  postId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ type: CommentUserDto })
  user: CommentUserDto;

  @ApiProperty({ type: [CommentLikeDto] })
  likes: CommentLikeDto[];

  @ApiProperty({ type: [ReplyDto] })
  replies: ReplyDto[];

  @ApiProperty({ type: CommentCountDto })
  _count: CommentCountDto;

  @ApiProperty({ example: true })
  isLiked: boolean;

  @ApiProperty({ example: '2025-11-24T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-11-24T10:00:00.000Z' })
  updatedAt: Date;
}

export class DeleteCommentResponseDto {
  @ApiProperty({ example: 'Comment deleted successfully' })
  message: string;
}
