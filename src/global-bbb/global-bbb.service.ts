import { Injectable } from '@nestjs/common';
import { CreateGlobalBbbDto } from './dto/create-global-bbb.dto';
import { UpdateGlobalBbbDto } from './dto/update-global-bbb.dto';
import { GlobalAaaService } from '../global-aaa/global-aaa.service'; // Import the AaaService

@Injectable()
export class GlobalBbbService {
  constructor(private globalAaaService: GlobalAaaService) {}

  create(createGlobalBbbDto: CreateGlobalBbbDto) {
    return 'This action adds a new globalBbb';
  }

  findAll() {
    return (
      `This action returns all globalBbb` + this.globalAaaService.findAll()
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} globalBbb`;
  }

  update(id: number, updateGlobalBbbDto: UpdateGlobalBbbDto) {
    return `This action updates a #${id} globalBbb`;
  }

  remove(id: number) {
    return `This action removes a #${id} globalBbb`;
  }
}
