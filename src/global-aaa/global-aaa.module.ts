import {
  Global,
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { GlobalAaaService } from './global-aaa.service';
import { GlobalAaaController } from './global-aaa.controller';

@Global() // 标记为全局模块 其exports的provide就可以在全局使用了，而不需要手动imports
@Module({
  controllers: [GlobalAaaController],
  providers: [GlobalAaaService],
  exports: [GlobalAaaService], // 导出服务，使其可以在其他模块中使用
})
export class GlobalAaaModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    OnApplicationShutdown
{
  constructor(
    private moduleRef: ModuleRef,
    private readonly globalAaaService: GlobalAaaService,
  ) {}

  onModuleInit() {
    console.log('GlobalAaaModule onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('GlobalAaaModule onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('GlobalAaaModule onModuleDestroy');
  }

  onApplicationShutdown() {
    const globalAaaService =
      this.moduleRef.get<GlobalAaaService>(GlobalAaaService);
    console.log(
      '-----------------------------------',
      globalAaaService.findAll(),
    );
    console.log('GlobalAaaModule onApplicationShutdown');
  }
}
