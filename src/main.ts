import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 端口区分dev和prod环境
  const port = 

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
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: 'public' });
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT, () => {
    console.log(
      `Application is running on: http://localhost:${process.env.PORT}`,
    );
  });
}
bootstrap();
