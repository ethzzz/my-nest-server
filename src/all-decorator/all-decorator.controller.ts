import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  HostParam,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Ip,
  Optional,
  Param,
  Post,
  Query,
  Redirect,
  Render,
  Req,
  Res,
  Session,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AllDecoratorService } from './all-decorator.service';
import { User } from './dto/add-user.dto';
import { TestFilter } from '../test.filter';
import { LoginGuard } from '../login.guard';
import { TimeInterceptor } from '../time.interceptor';
import { ValidatePipe } from '../validate.pipe';
import { AppService } from '../app.service';
import { OtherService } from '../other/other.service';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

@Controller('all-decorator')
// @Controller({ host: ':host.0.0.1', path: 'all-decorator' })
export class AllDecoratorController {
  constructor(
    @Optional() private readonly allDecoratorService: AllDecoratorService,
  ) {}

  // 通过修饰器注入service
  // 还可以通过 @Optional装饰器来表明这是可选的，不在module中provides中提供的
  @Optional()
  @Inject()
  // private readonly allDecoratorService: AllDecoratorService;
  private readonly appService: AppService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  @Inject(OtherService)
  private readonly httpClient: OtherService;

  // @Get(':name')
  // getHello(@Query() name: string): string {
  //   return this.allDecoratorService.getHello(name);
  // }

  @Post('add')
  add(@Body() user: User): void {
    // console.log(user);
    return this.allDecoratorService.addUser(user);
  }

  @Post('add/:name')
  addName(
    @Body() user: { name: string; age: number },
    @Param('name') name: string,
  ): void {
    console.log(user);
    console.log(name);
  }

  @Post('add2')
  @UseFilters(TestFilter) // 处理异常
  @UseGuards(LoginGuard)
  @UseInterceptors(TimeInterceptor)
  @UsePipes(ValidatePipe)
  add2(@Body() user: User): void {
    throw new HttpException('error', HttpStatus.BAD_REQUEST);
  }

  // SetMetadata
  //
  @Post('other')
  @SetMetadata('role', 'admin')
  other(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>,
  ): string {
    // console.log(this.reflector.get('role'));
    console.log(accept, headers);
    return 'other';
  }

  // 获取Ip
  @Get('ip')
  getIp(@Ip() ip: string): string {
    console.log('ip====', ip);
    return ip;
  }

  // 获取session
  @Get('session')
  getSession(@Session() session: Record<string, any>): string {
    console.log('session====', session);
    if (!session.count) {
      session.count = 0;
    }
    session.count = session.count + 1;
    return session.count;
  }

  // 获取HostParam 域名部分的参数
  @Get('host/:host')
  getHost(@HostParam('host') host: string): string {
    console.log('host====', host); // host : 127
    return host;
  }

  // 直接注入Req 获取Req
  // 作用: 获取请求对象
  @Get('req')
  getReq(@Req() req: Request): void {
    console.log('req.hostname', req.hostname);
    console.log('req.ip', req.ip);
    console.log('req.protocol', req.protocol);
    console.log('req.path', req.path);
  }

  // 注入Res
  // 作用 特定于库的方法 用来手动回传相应内容
  // 特殊 需要手动调用res.send()才能正确返回内容
  // 如果不调用res.send()，则需要设置passthrough告诉nest  @Res({ passthrough: true })
  @Get('res')
  getRes(@Res() res: Response): void {
    res.send('res');
  }

  // 修改默认返回的http状态码
  @Get('httpCode')
  @HttpCode(222)
  getHttpCode(): string {
    return 'hello';
  }

  // 修改res header
  // @Header装饰器
  // 作用: 自定义返回response的header
  @Get('setResHeader')
  @Header('Auth', 'xxx')
  @Header('AuthExpress', '2000')
  setResHeader(): string {
    return 'header';
  }

  // @Redirect装饰器 指定路由重定向url
  // 或者在返回值的地方设置url
  @Get('redirect')
  @Redirect('https://www.baidu.com', 301) // 静态重定向
  // @Redirect()
  redirect(): any {
    // return 'redirect';]
    // 动态重定向
    return {
      url: 'https://www.baidu.com',
      statusCode: 302,
    };
  }

  // 模板渲染 hbs
  // @Render装饰器
  // 作用: 指定模板文件
  @Get('hbs')
  @Render('home') //指定模板文件
  hbs(): any {
    return {
      title: 'Home',
      desc: 'Welcome to the Home Page',
    };
  }
}
