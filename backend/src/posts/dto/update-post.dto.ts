import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'Updated post content',
    example: 'This is my updated post content!',
    maxLength: 5000,
    type: String,
  })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  content?: string;

  @ApiPropertyOptional({
    description: 'Whether the post is private or public',
    example: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  isPrivate?: boolean;
}
