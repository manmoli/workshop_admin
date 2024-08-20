import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { VehicleSparePart } from '../../spare_part/entities/vehicle_spare_part.entity';
import { Customer } from '../../customers/entities/customers.entity';
import { ServiceOrder } from '../../service_order/entities/service_order.entity';


@Entity()
export class CustomerVehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  customerId: number

  @Column({ type: 'varchar', nullable: true, unique: true })
  license_plate: string

  @Column({ type: 'varchar', nullable: true, unique: false })
  vin: string

/*   @ManyToOne(() => Customer, (customer) => customer.vehicles, {
    nullable: false
  })
  customer: Customer */
}
//make, model, cylinders, year, trany, displ, cylinders, year

//suggest(make, "honda") and suggest(model, "accord") and year >= date'2002' and year < date'2003'