import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { OtherModule } from './other/other.module';
import { GlobalAaaModule } from './global-aaa/global-aaa.module';
import { GlobalBbbModule } from './global-bbb/global-bbb.module';

@Module({
  imports: [PersonModule, OtherModule, GlobalAaaModule, GlobalBbbModule],
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
  ],
})
export class AppModule {}
