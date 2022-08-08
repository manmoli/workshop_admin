import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeOrmModuleConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'workshop-admin',
  entities: [],
  synchronize: true
}
