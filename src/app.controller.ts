import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
@UseInterceptors(TimeInterceptor) // 全局路由使用拦截器
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
  @UseGuards(LoginGuard) // 局部路由使用守卫
  getHello(): string {
    console.log('app.controller.ts', 'getHello');
    return this.appService.getHello();
  }

  @Get('interceptor')
  @UseInterceptors(TimeInterceptor) // 局部路由使用拦截器
  getInterceptor(): string {
    return 'Time Interceptor';
  }

  @Get('pipe')
  getPipe(@Query('num', ValidatePipe) num: number): number {
    return num + 1;
  }

  @Get('filter')
  @UseFilters(TestFilter)
  getFilter(@Query('num', ValidatePipe) num: number): number {
    return num + 1;
  }
}
