import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customers.entity';
import { VehicleModel } from '../../vehicle_model/entities/vehicle_model.entity';

@Entity()
export class CustomerVehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, unique: true })
  licensePlate: string

  @Column({ type: 'varchar', nullable: true, unique: false })
  vin: string

  @Column({ type: 'int', nullable: false, unique: false })
  vehicleModelId: number

  @ManyToOne(() => VehicleModel, vehicleModel => vehicleModel.customerVehicles)
  VehicleModel: VehicleModel
  
  @Column({ type: 'int', nullable: false })
  customerId: number

  @ManyToOne(() => Customer, customer => customer.customerVehicles)
  customer: Customer
}
//make, model, cylinders, year, trany, displ, cylinders, year

//suggest(make, "honda") and suggest(model, "accord") and year >= date'2002' and year < date'2003'