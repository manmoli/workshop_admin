import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { ServiceOrder } from './service_order.entity';


@Entity()
export class ServiceOrderService {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.serviceOrderServices)
  service: Service;

  @Column('decimal')
  servicePriceAtOrder: number;

  @ManyToOne(() => ServiceOrder, (serviceOrder) => serviceOrder.serviceOrderServices)
  serviceOrder: ServiceOrder;
}