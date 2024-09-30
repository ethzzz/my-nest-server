import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MiddlewareService } from './middleware.service';
import { MiddlewareController } from './middleware.controller';
import { LogMiddleware } from '../log.middleware';

@Module({
  controllers: [MiddlewareController],
  providers: [MiddlewareService],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(MiddlewareService).forRoutes('*');
    consumer.apply(LogMiddleware).forRoutes('middleware');
  }
}
