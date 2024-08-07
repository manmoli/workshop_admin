import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SparePart } from './spare_part.entity';
import { VehicleModel } from '../../vehicle_model/entities/vehicle_model.entity';

@Entity()
export class VehicleSparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VehicleModel, (vehicleModel) => vehicleModel.vehicleSpareParts)
  vehicleModel: VehicleModel;

  @ManyToOne(() => SparePart, (sparePart) => sparePart.vehicleSpareParts)
  sparePart: SparePart;
}
