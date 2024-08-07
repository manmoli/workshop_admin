import { Test, TestingModule } from '@nestjs/testing';
import { SparePartController } from './spare_part.controller';
import { SparePartService } from './spare_part.service';

describe('SparePartController', () => {
  let controller: SparePartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SparePartController],
      providers: [SparePartService],
    }).compile();

    controller = module.get<SparePartController>(SparePartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
