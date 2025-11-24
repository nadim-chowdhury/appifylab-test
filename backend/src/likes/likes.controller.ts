// src/likes/likes.controller.ts (updated with DTOs)
import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {
  ToggleLikeResponseDto,
  LikesResponseDto,
} from './dto/like-response.dto';

@ApiTags('Likes')
@Controller('likes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('posts/:postId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle like on a post' })
  @ApiParam({ name: 'postId', description: 'Post ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Post like toggled successfully',
    type: ToggleLikeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Post not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  togglePostLike(@Param('postId') postId: string, @CurrentUser() user: any) {
    return this.likesService.togglePostLike(postId, user.id);
  }

  @Get('posts/:postId')
  @ApiOperation({ summary: 'Get all likes for a post' })
  @ApiParam({ name: 'postId', description: 'Post ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'List of post likes retrieved successfully',
    type: LikesResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getPostLikes(@Param('postId') postId: string) {
    return this.likesService.getPostLikes(postId);
  }

  @Post('comments/:commentId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle like on a comment' })
  @ApiParam({ name: 'commentId', description: 'Comment ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Comment like toggled successfully',
    type: ToggleLikeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  toggleCommentLike(
    @Param('commentId') commentId: string,
    @CurrentUser() user: any,
  ) {
    return this.likesService.toggleCommentLike(commentId, user.id);
  }

  @Get('comments/:commentId')
  @ApiOperation({ summary: 'Get all likes for a comment' })
  @ApiParam({ name: 'commentId', description: 'Comment ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'List of comment likes retrieved successfully',
    type: LikesResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getCommentLikes(@Param('commentId') commentId: string) {
    return this.likesService.getCommentLikes(commentId);
  }

  @Post('replies/:replyId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Toggle like on a reply' })
  @ApiParam({ name: 'replyId', description: 'Reply ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'Reply like toggled successfully',
    type: ToggleLikeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Reply not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  toggleReplyLike(@Param('replyId') replyId: string, @CurrentUser() user: any) {
    return this.likesService.toggleReplyLike(replyId, user.id);
  }

  @Get('replies/:replyId')
  @ApiOperation({ summary: 'Get all likes for a reply' })
  @ApiParam({ name: 'replyId', description: 'Reply ID', type: String })
  @ApiResponse({
    status: 200,
    description: 'List of reply likes retrieved successfully',
    type: LikesResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getReplyLikes(@Param('replyId') replyId: string) {
    return this.likesService.getReplyLikes(replyId);
  }
}
