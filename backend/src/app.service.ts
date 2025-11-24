import { Injectable } from '@nestjs/common';
import { HealthCheckDto } from './dto/health-check.dto';

@Injectable()
export class AppService {
  getHello(): HealthCheckDto {
    return {
      success: true,
      message: 'Welcome to Social Feed API',
      data: {
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
      },
    };
  }

  healthCheck(): HealthCheckDto {
    return {
      success: true,
      message: 'Service is healthy',
      data: {
        status: 'up',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          unit: 'MB',
        },
      },
    };
  }
}
