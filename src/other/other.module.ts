import { Module } from '@nestjs/common';
import { OtherService } from './other.service';

@Module({
  providers: [OtherService],
  exports: [OtherService], // exports: [OtherService, OtherController],
})
export class OtherModule {}
