import { Module } from '@nestjs/common';
import { GlobalBbbService } from './global-bbb.service';
import { GlobalBbbController } from './global-bbb.controller';
// import { GlobalAaaModule } from '../global-aaa/global-aaa.module';

@Module({
  // imports: [GlobalAaaModule],
  controllers: [GlobalBbbController],
  providers: [GlobalBbbService],
})
export class GlobalBbbModule {}
