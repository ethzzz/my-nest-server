import { Module } from '@nestjs/common';
import { AopService } from './aop.service';
import { AopController } from './aop.controller';

@Module({
  controllers: [AopController],
  providers: [AopService],
})
export class AopModule {}
