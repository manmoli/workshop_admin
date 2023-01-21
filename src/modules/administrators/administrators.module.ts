import { Module } from '@nestjs/common'
import { AdministratorsService } from './services/administrators.service'
import { AdministratorsController } from './controllers/administrators.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Administrator } from './entities/administrator.entity'

@Module({
  controllers: [AdministratorsController],
  providers: [AdministratorsService],
  imports: [TypeOrmModule.forFeature([Administrator])]
})
export class AdministratorsModule {}
