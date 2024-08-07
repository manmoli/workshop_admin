import { Module } from '@nestjs/common';
import { SparePartService } from './spare_part.service';
import { SparePartController } from './spare_part.controller';

@Module({
  controllers: [SparePartController],
  providers: [SparePartService]
})
export class SparePartModule {}
