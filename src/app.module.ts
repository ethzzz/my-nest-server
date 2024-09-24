import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { OtherModule } from './other/other.module';
import { GlobalAaaModule } from './global-aaa/global-aaa.module';
import { GlobalBbbModule } from './global-bbb/global-bbb.module';
import { AopModule } from './aop/aop.module';
import { LogMiddleware } from './log.middleware';
import { LoginGuard } from './login.guard';
import { APP_GUARD } from '@nestjs/core';
import { AllDecoratorModule } from './all-decorator/all-decorator.module';

@Module({
  imports: [
    PersonModule,
    OtherModule,
    GlobalAaaModule,
    GlobalBbbModule,
    AopModule,
    AllDecoratorModule,
  ],
  controllers: [AppController],
  // providers: [AppService],
  providers: [
    // 指定class
    {
      provide: AppService,
      useClass: AppService,
    },
    // 指定一个值
    {
      provide: 'APP_NAME',
      useValue: {
        name: 'Nestjs',
        age: 20,
      },
    },
    // useFactory 用来动态创建一个对象
    /*{
      provide: 'person2',
      // 支持异步
      useFactory: async (
        person: { name: string; age: number },
        appService: AppService,
      ) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          name: person.name,
          age: person.age,
          desc: appService.getHello(),
        };
      },
    },*/
    // 全局声明Guard
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
