import { Injectable } from '@nestjs/common';
import { CreateAopDto } from './dto/create-aop.dto';
import { UpdateAopDto } from './dto/update-aop.dto';

@Injectable()
export class AopService {
  create(createAopDto: CreateAopDto) {
    return 'This action adds a new aop';
  }

  findAll() {
    return `This action returns all aop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aop`;
  }

  update(id: number, updateAopDto: UpdateAopDto) {
    return `This action updates a #${id} aop`;
  }

  remove(id: number) {
    return `This action removes a #${id} aop`;
  }
}
