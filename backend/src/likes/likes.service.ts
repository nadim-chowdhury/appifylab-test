import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  // Post Likes
  async togglePostLike(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingLike = await this.prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await this.prisma.postLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      return {
        liked: false,
        message: 'Post unliked',
      };
    } else {
      // Like
      await this.prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      });

      return {
        liked: true,
        message: 'Post liked',
      };
    }
  }

  async getPostLikes(postId: string) {
    const likes = await this.prisma.postLike.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      count: likes.length,
      likes: likes.map((like) => ({
        id: like.id,
        user: like.user,
        createdAt: like.createdAt,
      })),
    };
  }

  // Comment Likes
  async toggleCommentLike(commentId: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    const existingLike = await this.prisma.commentLike.findUnique({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      return {
        liked: false,
        message: 'Comment unliked',
      };
    } else {
      await this.prisma.commentLike.create({
        data: {
          commentId,
          userId,
        },
      });

      return {
        liked: true,
        message: 'Comment liked',
      };
    }
  }

  async getCommentLikes(commentId: string) {
    const likes = await this.prisma.commentLike.findMany({
      where: { commentId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      count: likes.length,
      likes: likes.map((like) => ({
        id: like.id,
        user: like.user,
        createdAt: like.createdAt,
      })),
    };
  }

  // Reply Likes
  async toggleReplyLike(replyId: string, userId: string) {
    const reply = await this.prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!reply) {
      throw new NotFoundException('Reply not found');
    }

    const existingLike = await this.prisma.replyLike.findUnique({
      where: {
        replyId_userId: {
          replyId,
          userId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.replyLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      return {
        liked: false,
        message: 'Reply unliked',
      };
    } else {
      await this.prisma.replyLike.create({
        data: {
          replyId,
          userId,
        },
      });

      return {
        liked: true,
        message: 'Reply liked',
      };
    }
  }

  async getReplyLikes(replyId: string) {
    const likes = await this.prisma.replyLike.findMany({
      where: { replyId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      count: likes.length,
      likes: likes.map((like) => ({
        id: like.id,
        user: like.user,
        createdAt: like.createdAt,
      })),
    };
  }
}
