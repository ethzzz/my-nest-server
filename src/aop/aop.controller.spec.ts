import { Test, TestingModule } from '@nestjs/testing';
import { AopController } from './aop.controller';
import { AopService } from './aop.service';

describe('AopController', () => {
  let controller: AopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AopController],
      providers: [AopService],
    }).compile();

    controller = module.get<AopController>(AopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
