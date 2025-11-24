import { ApiProperty } from '@nestjs/swagger';

class UserBasicDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'john@example.com', required: false })
  email?: string;
}

class LikeDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  id: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ type: UserBasicDto })
  user: UserBasicDto;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;
}

class ReplyDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440003' })
  id: string;

  @ApiProperty({ example: 'Thanks for your comment!' })
  content: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ type: UserBasicDto })
  user: UserBasicDto;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002' })
  commentId: string;

  @ApiProperty({ type: [LikeDto] })
  likes: LikeDto[];

  @ApiProperty({ example: false })
  isLiked: boolean;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;
}

class CommentDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002' })
  id: string;

  @ApiProperty({ example: 'Great post!' })
  content: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ type: UserBasicDto })
  user: UserBasicDto;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  postId: string;

  @ApiProperty({ type: [LikeDto] })
  likes: LikeDto[];

  @ApiProperty({ type: [ReplyDto] })
  replies: ReplyDto[];

  @ApiProperty({ example: false })
  isLiked: boolean;

  @ApiProperty({
    example: { likes: 5, replies: 2 },
    description: 'Count of likes and replies',
  })
  _count?: {
    likes: number;
    replies: number;
  };

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;
}

export class PostResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  id: string;

  @ApiProperty({ example: 'This is my first post!' })
  content: string;

  @ApiProperty({ example: false })
  isPrivate: boolean;

  @ApiProperty({
    example: 'https://example.com/images/post.jpg',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  userId: string;

  @ApiProperty({ type: UserBasicDto })
  user: UserBasicDto;

  @ApiProperty({
    example: { likes: 10, comments: 5 },
    description: 'Count of likes and comments',
  })
  _count: {
    likes: number;
    comments: number;
  };

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  updatedAt: Date;
}

export class PostWithLikesDto extends PostResponseDto {
  @ApiProperty({ type: [LikeDto] })
  likes: LikeDto[];

  @ApiProperty({
    example: false,
    description: 'Whether current user liked this post',
  })
  isLiked: boolean;

  @ApiProperty({ example: 10, description: 'Total number of likes' })
  likesCount: number;

  @ApiProperty({ example: 5, description: 'Total number of comments' })
  commentsCount: number;
}

export class PostDetailResponseDto extends PostWithLikesDto {
  @ApiProperty({ type: [CommentDto] })
  comments: CommentDto[];
}

class PaginationDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 5 })
  totalPages: number;
}

export class PostsListResponseDto {
  @ApiProperty({ type: [PostWithLikesDto] })
  posts: PostWithLikesDto[];

  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto;
}
