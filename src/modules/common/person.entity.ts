import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  first_name: string

  @Column({ type: 'varchar', nullable: true })
  second_name: string

  @Column({ type: 'varchar' })
  last_name: string

  @Column({ type: 'int', nullable: true })
  age: number

  @Column({ type: 'varchar', unique: true, nullable: true })
  image_url: string

  @Column({ type: 'varchar', unique: true, nullable: true })
  phone_number: string
}
