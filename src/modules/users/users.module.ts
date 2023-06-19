import { Module } from '@nestjs/common'
import { UsersService } from './services/users.service'
import { UsersController } from './controllers/user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/users.entity'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UserModule {}
