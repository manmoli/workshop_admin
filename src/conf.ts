import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { registerAs } from '@nestjs/config'
import { ParseBoolPipe } from '@nestjs/common'
import { DataSourceOptions } from 'typeorm'

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'workshop-admin',
  entities: [],
  synchronize: true
}

export default registerAs('config', () => {
  return {
    database: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    port: process.env.PORT,
    api_key: process.env.API_KEY
  }
})
