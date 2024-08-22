import { Module } from '@nestjs/common';
import { VehicleModelService } from './vehicle_model.service';
import { VehicleModelController } from './vehicle_model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleModel } from './entities/vehicle_model.entity';

@Module({
  controllers: [VehicleModelController],
  providers: [VehicleModelService],
  imports: [TypeOrmModule.forFeature([VehicleModel])]
})
export class VehicleModelModule {}
