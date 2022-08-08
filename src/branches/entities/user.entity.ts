import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  secondName: string

  @Column()
  lastName: string

  @Column()
  age: number

  @Column()
  imageUrl: string

  @Column()
  taxId: string

  @Column({ default: true })
  isActive: boolean
}
