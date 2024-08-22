import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity()
export class VehicleModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: true })
  brand: string

  @Column({ type: 'varchar', nullable: false })
  model: string

  @Column({ type: 'int', nullable: false })
  model_year: number

  @Column({ type: 'int', nullable: false })
  cylinders: number

  @Column({ type: 'float', nullable: true })
  vehicle_engine: string //displ

  @Column({ type: 'varchar', nullable: true })
  vehicle_transmission: string

}
