import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VehicleSparePart } from '../../spare_part/entities/vehicle_spare_part.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity()
export class VehicleModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vim: string;

  @Column()
  year: number;

  @Column()
  model: string;

  @Column()
  motor: string;

  @OneToMany(() => VehicleSparePart, (vehicleSparePart) => vehicleSparePart.vehicleModel)
  vehicleSpareParts: VehicleSparePart[];

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicleModel)
  vehicles: Vehicle[];
}