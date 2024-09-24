import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoginGuard } from './login.guard';
import * as session from 'express-session';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', { prefix: '/static' });

  // 全局中间件
  app.use((req: Request, res: Response, next) => {
    console.log('before...', req.url);
    next();
    console.log('after...');
  });

  // 全局Session
  app.use(
    session({
      secret: '123456',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
    }),
  );

  // 设置响应内容渲染引擎
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // 全局路由守卫  不在IOC容器中管理
  // app.useGlobalGuards(new LoginGuard());

  await app.listen(3000);
  /*setTimeout(() => {
    app.close();
  }, 3000);*/
}
bootstrap();
