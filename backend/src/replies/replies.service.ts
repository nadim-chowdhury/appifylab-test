import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class RepliesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createReplyDto: CreateReplyDto) {
    const { commentId, content } = createReplyDto;

    // Check if comment exists
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const reply = await this.prisma.reply.create({
      data: {
        content,
        commentId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return reply;
  }

  async update(id: string, userId: string, content: string) {
    const reply = await this.prisma.reply.findUnique({
      where: { id },
    });

    if (!reply) {
      throw new NotFoundException('Reply not found');
    }

    if (reply.userId !== userId) {
      throw new ForbiddenException('You can only update your own replies');
    }

    const updatedReply = await this.prisma.reply.update({
      where: { id },
      data: { content },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return updatedReply;
  }

  async remove(id: string, userId: string) {
    const reply = await this.prisma.reply.findUnique({
      where: { id },
    });

    if (!reply) {
      throw new NotFoundException('Reply not found');
    }

    if (reply.userId !== userId) {
      throw new ForbiddenException('You can only delete your own replies');
    }

    await this.prisma.reply.delete({
      where: { id },
    });

    return { message: 'Reply deleted successfully' };
  }
}
