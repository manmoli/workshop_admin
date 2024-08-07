import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class ServiceType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  frequency_in_days: number;

  @OneToMany(() => Service, (service) => service.type)
  services: Service[];
}