import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  // 查找name和age的人 url: person/find?name=xxx&age=xxx
  @Get('find')
  find(@Query('name') name: string, @Query('age') age: number) {
    return this.personService.find(name, age);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  // Content-type: application/x-www-form-urlencoded
  // post 请求  form urlencoded
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  // post 请求
  // json
  @Post()
  createPerson(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }

  // Content-Type: form-data
  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: './uploads',
    }),
  )
  upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log('files===', files);
    return this.personService.upload(files);
  }
}
