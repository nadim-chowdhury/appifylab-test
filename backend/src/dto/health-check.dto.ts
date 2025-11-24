import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Service is healthy' })
  message: string;

  @ApiProperty({
    example: {
      status: 'up',
      timestamp: '2024-01-01T00:00:00.000Z',
    },
  })
  data?: any;
}
