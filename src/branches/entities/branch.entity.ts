import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Department } from '../../departments/entities/department.entity'

@Entity()
export class BranchOffice {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', unique: true })
  name: string

  @OneToMany(() => Department, (department) => department.branch)
  departments: Department[]
}
