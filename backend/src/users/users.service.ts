import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserSearchDto } from './dto/user-search.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Get user by ID
  async findById(userId: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: false,
    });
  }

  // Get user by email
  async findByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return null;
    }

    return plainToClass(UserResponseDto, user, {
      excludeExtraneousValues: false,
    });
  }

  // Get current user profile
  async getProfile(userId: string): Promise<UserResponseDto> {
    return this.findById(userId);
  }

  // Update user profile
  async updateProfile(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    // Check if user exists
    await this.findById(userId);

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return plainToClass(UserResponseDto, updatedUser, {
      excludeExtraneousValues: false,
    });
  }

  // Change user password
  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { currentPassword, newPassword } = changePasswordDto;

    // Get user with password
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Check if new password is same as current
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException(
        'New password must be different from current password',
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  // Delete user account
  async deleteAccount(userId: string): Promise<void> {
    // Check if user exists
    await this.findById(userId);

    // Delete user (cascade will handle related data based on Prisma schema)
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }

  // Get multiple users by IDs (for posts, comments, likes display)
  async findByIds(userIds: string[]): Promise<UserResponseDto[]> {
    if (!userIds || userIds.length === 0) {
      return [];
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: { in: userIds },
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users.map((user) =>
      plainToClass(UserResponseDto, user, { excludeExtraneousValues: false }),
    );
  }

  // Search users by name or email
  async searchUsers(searchDto: UserSearchDto): Promise<{
    users: UserResponseDto[];
    total: number;
    hasMore: boolean;
  }> {
    const { query, limit = 10, offset = 0 } = searchDto;

    const whereCondition = query
      ? {
          OR: [
            { firstName: { contains: query, mode: 'insensitive' as const } },
            { lastName: { contains: query, mode: 'insensitive' as const } },
            { email: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: whereCondition,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
        take: limit,
        skip: offset,
        orderBy: {
          firstName: 'asc',
        },
      }),
      this.prisma.user.count({
        where: whereCondition,
      }),
    ]);

    return {
      users: users.map((user) =>
        plainToClass(UserResponseDto, user, { excludeExtraneousValues: false }),
      ),
      total,
      hasMore: offset + limit < total,
    };
  }

  // Get user statistics (for admin/analytics)
  async getUserStats(userId: string): Promise<{
    postsCount: number;
    commentsCount: number;
    likesGiven: number;
  }> {
    // First check if user exists
    await this.findById(userId);

    const [
      postsCount,
      commentsCount,
      postLikesCount,
      commentLikesCount,
      replyLikesCount,
    ] = await Promise.all([
      // Count posts created by user
      this.prisma.post.count({
        where: { userId: userId },
      }),
      // Count comments created by user
      this.prisma.comment.count({
        where: { userId: userId },
      }),
      // Count post likes given by user
      this.prisma.postLike.count({
        where: { userId: userId },
      }),
      // Count comment likes given by user
      this.prisma.commentLike.count({
        where: { userId: userId },
      }),
      // Count reply likes given by user
      this.prisma.replyLike.count({
        where: { userId: userId },
      }),
    ]);

    // Total likes given is sum of all like types
    const likesGiven = postLikesCount + commentLikesCount + replyLikesCount;

    return {
      postsCount,
      commentsCount,
      likesGiven,
    };
  }

  // Get all users (admin only - paginated)
  async findAll(
    limit: number = 20,
    offset: number = 0,
  ): Promise<{
    users: UserResponseDto[];
    total: number;
  }> {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
        take: limit,
        skip: offset,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      users: users.map((user) =>
        plainToClass(UserResponseDto, user, { excludeExtraneousValues: false }),
      ),
      total,
    };
  }
}
