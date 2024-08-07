import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from './service.entity';
import { SparePart } from '../../spare_part/entities/spare_part.entity';



@Entity()
export class ServiceSparePart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.serviceSpareParts)
  service: Service;

  @ManyToOne(() => SparePart, (sparePart) => sparePart.serviceSpareParts)
  sparePart: SparePart;

  @Column('decimal')
  priceAtOrder: number;
}