import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  OnApplicationShutdown,
} from '@nestjs/common';
import { GlobalAaaService } from './global-aaa.service';
import { CreateGlobalAaaDto } from './dto/create-global-aaa.dto';
import { UpdateGlobalAaaDto } from './dto/update-global-aaa.dto';

@Controller('global-aaa')
export class GlobalAaaController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    OnApplicationShutdown
{
  constructor(private readonly globalAaaService: GlobalAaaService) {}

  onModuleInit() {
    console.log('GlobalAaaController OnModuleInit');
  }

  onApplicationBootstrap() {
    console.log('GlobalAaaController OnApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('GlobalAaaController OnModuleDestroy');
  }

  onApplicationShutdown() {
    console.log('GlobalAaaController OnApplicationShutdown');
  }

  @Post()
  create(@Body() createGlobalAaaDto: CreateGlobalAaaDto) {
    return this.globalAaaService.create(createGlobalAaaDto);
  }

  @Get()
  findAll() {
    return this.globalAaaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalAaaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGlobalAaaDto: UpdateGlobalAaaDto,
  ) {
    return this.globalAaaService.update(+id, updateGlobalAaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalAaaService.remove(+id);
  }
}
