import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import { ServiceType } from '../../service_type/entities/service_type.entity';
import { ServiceOrderService } from '../../service_order/entities/service_order_service.entity';
import { ServiceSparePart } from './service_spare_part.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  price: number;

  @Column()
  date: string;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.services)
  type: ServiceType;

  @OneToMany(() => ServiceOrderService, (serviceOrderService) => serviceOrderService.service)
  serviceOrderServices: ServiceOrderService[];

  @OneToMany(() => ServiceSparePart, (serviceSparePart) => serviceSparePart.service)
  serviceSpareParts: ServiceSparePart[];
}