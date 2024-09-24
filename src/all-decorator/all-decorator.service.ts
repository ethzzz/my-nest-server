import { Injectable } from '@nestjs/common';
import { User } from './dto/add-user.dto';

@Injectable()
export class AllDecoratorService {
  getHello(name: string): string {
    return 'Hello ' + name + '!';
  }

  addUser(user: User): void {
    // Add user to database
    console.log(user);
  }
}
