import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'uuid-here' })
  id: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;
}

export class LikeDto {
  @ApiProperty({ example: 'uuid-here' })
  id: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ example: '2025-11-24T10:00:00.000Z' })
  createdAt: Date;
}

export class LikesResponseDto {
  @ApiProperty({ example: 5 })
  count: number;

  @ApiProperty({ type: [LikeDto] })
  likes: LikeDto[];
}

export class ToggleLikeResponseDto {
  @ApiProperty({ example: true })
  liked: boolean;

  @ApiProperty({ example: 'Post liked' })
  message: string;
}
