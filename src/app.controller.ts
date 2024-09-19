import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 构造器注入AppService
  constructor(private readonly appService: AppService) {}
  // 如果app.module.ts中 AppService provide时 token 为字符串，那么注入的时候需要手动指定注入对象的token了
  // useValue 注入
  // constructor(
  // @Inject('APP_SERVICE') private readonly appService: AppService
  // @Inject('APP_NAME') private readonly APP_NAME:{name: string, age: number}
  // @Inject('person2') private readonly APP_NAME:{name: string, age: number}
  // ){}

  // @Inject 注入
  // @Inject(AppService)
  // private readonly appService: AppService
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
