import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BranchOffice } from '../../branches/entities/branch.entity'

export class Department {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', unique: true })
  name: string

  @ManyToOne(() => BranchOffice, (branch) => branch.departments)
  branch: BranchOffice
}
