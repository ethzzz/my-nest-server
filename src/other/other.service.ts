import { Injectable } from '@nestjs/common';

@Injectable()
export class OtherService {
  // TODO: Implement other service
  xxx() {
    return 'xxx';
  }

  findOne(id: string) {
    return 'find id: ' + id;
  }
}
