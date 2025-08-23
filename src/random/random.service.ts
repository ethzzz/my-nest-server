import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class RandomService {
    // 随机数字
    randomNumber(min:number = 0, max: number = 10000): number | string {
        return faker.number.int({ min, max });
    }

    // 随机字符串
    randomString(length: number = 10): string {
        return faker.string.alphanumeric(length);
    }

    // 随机数组
    randomArray(length: number = 10): Array<any> {
        return Array.from({ length }, () => {
            return {
                id: faker.string.uuid(),
                name: faker.string.alphanumeric(4),
                age: faker.number.int({ min: 0, max: 99 }),
                email: faker.internet.email(),
            }
        });
    }

    // 随机对象
    randomObject(length: number = 5): Object {
        const obj = {};
        for (let i = 0; i < length; i++) {
            obj[faker.string.alphanumeric(4)] = faker.string.alphanumeric(8);
        }
        return obj;
    }
}