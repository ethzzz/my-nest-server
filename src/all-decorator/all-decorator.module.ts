import { Global, Module } from '@nestjs/common';
import { AllDecoratorService } from './all-decorator.service';
import { AllDecoratorController } from './all-decorator.controller';
import { AppService } from '../app.service';
import { OtherService } from '../other/other.service';

@Global() // 使得当前模块exports中的provide可以供全局使用，而不需要手动添加进imports里面
@Module({
  imports: [],
  controllers: [AllDecoratorController],
  providers: [AllDecoratorService, AppService, OtherService],
})
export class AllDecoratorModule {}
