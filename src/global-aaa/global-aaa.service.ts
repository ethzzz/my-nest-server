import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CreateGlobalAaaDto } from './dto/create-global-aaa.dto';
import { UpdateGlobalAaaDto } from './dto/update-global-aaa.dto';

@Injectable()
export class GlobalAaaService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('GlobalAaaService OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('GlobalAaaService onApplicationBootstrap.');
  }

  onModuleDestroy() {
    console.log('GlobalAaaService onModuleDestroy.');
  }

  onApplicationShutdown() {
    console.log(`GlobalAaaService onApplicationShutdown.`);
  }

  create(createGlobalAaaDto: CreateGlobalAaaDto) {
    return 'This action adds a new globalAaa';
  }

  findAll() {
    return `This action returns all globalAaa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} globalAaa`;
  }

  update(id: number, updateGlobalAaaDto: UpdateGlobalAaaDto) {
    return `This action updates a #${id} globalAaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalAaa`;
  }
}
