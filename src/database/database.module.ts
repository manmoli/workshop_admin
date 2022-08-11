import { Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from '../conf'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          ...configService.database,
          synchronize: true,
          autoLoadEntities: true,
          type: 'postgres'
        }
      }
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
