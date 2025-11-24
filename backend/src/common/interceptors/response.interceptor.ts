import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  path: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        // If data already has success key, return as is
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Transform response
        return {
          success: true,
          data,
          message: data?.message || 'Request successful',
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }),
    );
  }
}
