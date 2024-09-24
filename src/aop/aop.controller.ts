import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AopService } from './aop.service';
import { CreateAopDto } from './dto/create-aop.dto';
import { UpdateAopDto } from './dto/update-aop.dto';

@Controller('aop')
export class AopController {
  constructor(private readonly aopService: AopService) {}

  @Get()
  getHello() {
    console.log('handle....');
    return 'Hello World';
  }

  @Post()
  create(@Body() createAopDto: CreateAopDto) {
    return this.aopService.create(createAopDto);
  }

  @Get()
  findAll() {
    return this.aopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAopDto: UpdateAopDto) {
    return this.aopService.update(+id, updateAopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aopService.remove(+id);
  }
}
