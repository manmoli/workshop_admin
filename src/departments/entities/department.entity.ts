import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BranchOffice } from '../../branches/entities/branch.entity'

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', unique: true })
  name: string

  @Column({ type: 'int' })
  branchId: number

  @ManyToOne(() => BranchOffice, (branch) => branch.departments, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  branch: BranchOffice
}
