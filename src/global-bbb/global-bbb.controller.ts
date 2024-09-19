import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GlobalBbbService } from './global-bbb.service';
import { CreateGlobalBbbDto } from './dto/create-global-bbb.dto';
import { UpdateGlobalBbbDto } from './dto/update-global-bbb.dto';

@Controller('global-bbb')
export class GlobalBbbController {
  constructor(private readonly globalBbbService: GlobalBbbService) {}

  @Post()
  create(@Body() createGlobalBbbDto: CreateGlobalBbbDto) {
    return this.globalBbbService.create(createGlobalBbbDto);
  }

  @Get()
  findAll() {
    return this.globalBbbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalBbbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalBbbDto: UpdateGlobalBbbDto) {
    return this.globalBbbService.update(+id, updateGlobalBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalBbbService.remove(+id);
  }
}
