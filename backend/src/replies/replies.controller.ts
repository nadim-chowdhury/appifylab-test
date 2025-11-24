import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { RepliesService } from './replies.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import {
  ReplyResponseDto,
  DeleteReplyResponseDto,
} from './dto/reply-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Replies')
@Controller('replies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new reply to a comment' })
  @ApiResponse({
    status: 201,
    description: 'Reply created successfully',
    type: ReplyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@CurrentUser() user: any, @Body() createReplyDto: CreateReplyDto) {
    return this.repliesService.create(user.id, createReplyDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a reply' })
  @ApiParam({
    name: 'id',
    description: 'Reply ID',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Reply updated successfully',
    type: ReplyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Reply not found' })
  @ApiResponse({
    status: 403,
    description: 'You can only update your own replies',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() updateReplyDto: UpdateReplyDto,
  ) {
    return this.repliesService.update(id, user.id, updateReplyDto.content);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a reply' })
  @ApiParam({
    name: 'id',
    description: 'Reply ID',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Reply deleted successfully',
    type: DeleteReplyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Reply not found' })
  @ApiResponse({
    status: 403,
    description: 'You can only delete your own replies',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.repliesService.remove(id, user.id);
  }
}
