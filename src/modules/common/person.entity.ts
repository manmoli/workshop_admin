import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  firstName: string

  @Column({ type: 'varchar', nullable: true })
  secondName: string

  @Column({ type: 'varchar' })
  lastName: string

  @Column({ type: 'int', nullable: true })
  age: number

  @Column({ type: 'varchar', unique: true, nullable: true })
  imageUrl: string

  @Column({ type: 'varchar', unique: true, nullable: true })
  phoneNumber: string
}
