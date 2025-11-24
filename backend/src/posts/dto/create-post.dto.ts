import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post content',
    example: 'This is my first post!',
    maxLength: 5000,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content: string;

  @ApiPropertyOptional({
    description: 'Whether the post is private or public',
    example: false,
    default: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;

  @ApiPropertyOptional({
    description: 'URL of the post image',
    example: 'https://example.com/images/post.jpg',
    type: String,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
