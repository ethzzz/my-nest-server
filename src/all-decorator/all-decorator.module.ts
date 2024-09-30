import { Global, Module } from '@nestjs/common';
import { AllDecoratorService } from './all-decorator.service';
import { AllDecoratorController } from './all-decorator.controller';
import { AppService } from '../app.service';
import { OtherService } from '../other/other.service';

@Global() // 使得当前模块exports中的provide可以供全局使用，而不需要手动添加进imports里面
@Module({
  imports: [],
  controllers: [AllDecoratorController],
  // providers: [AllDecoratorService, AppService, OtherService], // 这种是简写语法
  providers: [
    {
      provide: AllDecoratorService,
      useClass: AllDecoratorService,
    },
    {
      provide: AppService,
      useClass: AppService,
    },
    {
      provide: OtherService,
      useClass: OtherService,
    },
  ],
  exports: [AllDecoratorService, AppService, OtherService], // 导出当前模块的providers，供其他模块使用
})
export class AllDecoratorModule {}
