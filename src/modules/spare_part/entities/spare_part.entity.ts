import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServiceSparePart } from '../../services/entities/service_spare_part.entity';
import { VehicleSparePart } from './vehicle_spare_part.entity';

@Entity()
export class SparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @OneToMany(() => ServiceSparePart, (serviceSparePart) => serviceSparePart.sparePart)
  serviceSpareParts: ServiceSparePart[];

  @OneToMany(() => ServiceSparePart, (vehicleSparePart) => vehicleSparePart.sparePart)
  vehicleSpareParts: VehicleSparePart[];
}