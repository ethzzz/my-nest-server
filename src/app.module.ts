import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { MiddlewareModule } from './middleware/middleware.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PersonModule,
    OtherModule,
    GlobalAaaModule,
    GlobalBbbModule,
    AopModule,
    AllDecoratorModule,
    MiddlewareModule,
    ConfigModule.forRoot({
      // 加载配置文件
      isGlobal: true, // 设置为全局模块
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'dev'}`], // 指定环境变量文件路径
      ignoreEnvFile: false, // 是否忽略.env文件
      cache: true, // 缓存配置
    }),
    UploadModule,
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
    // 全局方式注入Guard
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogMiddleware)
      .forRoutes({ method: RequestMethod.ALL, path: '*' });
  }
}
