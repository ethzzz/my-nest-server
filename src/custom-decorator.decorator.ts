import {
  applyDecorators,
  SetMetadata,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Post,
} from '@nestjs/common';
import { TestFilter } from './test.filter';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';

export const CustomDecorator = (...args: string[]) =>
  SetMetadata('custom-decorator', args);

export const MergeDecorator = (path) => {
  return applyDecorators(
    Post(path),
    UseFilters(TestFilter),
    UseGuards(LoginGuard),
    UseInterceptors(TimeInterceptor),
    UsePipes(ValidatePipe),
  );
};
