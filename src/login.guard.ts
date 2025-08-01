import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class LoginGuard implements CanActivate {
  // @Optional() // 表示可选注入
  @Inject(AppService)
  private appService: AppService;

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
