import {
  Controller,
  Get,
  Post,
  Param,
  Bind,
  ParseIntPipe,
  ParseUUIDPipe
} from '@nestjs/common';
import { OtherService } from './other.service';

@Controller('other')
export class OtherController {
  constructor(private readonly otherService: OtherService) {}
  // TODO: Add other endpoints
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.otherService.findOne(id);
  }

  @Get('uuid/:uuid')
  @Bind(Param('uuid', new ParseUUIDPipe()))
  async findTwo(uuid: string) {
    return this.otherService.findOne(uuid);
  }
}
