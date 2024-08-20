import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ServiceOrderService } from './service_order_service.entity';


@Entity()
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  totalPrice: number;

  @OneToMany(() => ServiceOrderService, (serviceOrderService) => serviceOrderService.serviceOrder)
  serviceOrderServices: ServiceOrderService[];
}