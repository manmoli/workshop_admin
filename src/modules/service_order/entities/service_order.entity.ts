import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { ServiceOrderService } from './service_order_service.entity';


@Entity()
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.serviceOrders)
  vehicle: Vehicle;

  @Column('decimal')
  totalPrice: number;

  @OneToMany(() => ServiceOrderService, (serviceOrderService) => serviceOrderService.serviceOrder)
  serviceOrderServices: ServiceOrderService[];
}