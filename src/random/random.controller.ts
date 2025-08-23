import { Controller, Get } from '@nestjs/common';
import { RandomService } from './random.service';

interface DataType {
    type: 'number' | 'string' | 'array' | 'object';
    length?: number;
}

interface ReturnType {
    data: number | string | Array<any> | Object;
}

@Controller('random')
export class RandomController {
    constructor(private readonly randomService: RandomService) { }

    @Get()

    getData(params: DataType): ReturnType {
        const { type, length } = params;
        let data: number | string | Array<any> | Object;

        switch (type) {
            case 'number':
                data = this.randomService.randomNumber();
                break;
            case 'string':
                data = this.randomService.randomString(length);
                break;
            case 'array':
                data = this.randomService.randomArray(length);
                break;
            case 'object':
                data = this.randomService.randomObject(length);
                break;
            default:
                data = null;
        }

        return { data };
    }
}