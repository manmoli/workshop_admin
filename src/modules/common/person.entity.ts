import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  first_name: string

  @Column({ type: 'varchar' })
  second_name: string

  @Column({ type: 'varchar' })
  last_name: string

  @Column({ type: 'int' })
  age: number

  @Column({ type: 'varchar', unique: true })
  image_url: string

  @Column({ type: 'varchar', unique: true })
  tax_id: string
}
