import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import * as _ from 'lodash'
import { FindOptions } from '../../../utils/types'
import { User } from '../entities/users.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = this.userRepo.create(createUserDto)
    await this.userRepo.save(user)
    return user
  }

  async findAll(findOptions?: FindOptions<User>): Promise<User[]> {
    const query = this.userRepo.createQueryBuilder('user') // Using 'user' as the alias
    if (findOptions?.where?.firstName) {
      query
        .where('user.first_name ILIKE :term1', {
          term1: `%${findOptions.where.firstName}%`
        })
        .orWhere('user.second_name ILIKE :term2', {
          term2: `%${findOptions.where.firstName}%`
        })
        .orWhere('user.last_name ILIKE :term3', {
          term3: `%${findOptions.where.firstName}%`
        })
    }
    const users: User[] = await query.getMany()

    return users
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userRepo.findOneBy({ id })
    if (!user) {
      throw new EntityNotFoundError(User, { id })
    }
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { affected } = await this.userRepo.update(id, updateUserDto)
    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(User, { id })
    }
    const user: User = await this.userRepo.findOneBy({ id })
    return user
  }

  async remove(id: number): Promise<boolean> {
    const { affected } = await this.userRepo.delete(id)
    if (affected === 0) {
      throw new EntityNotFoundError(User, { id })
    }
    return affected === 1
  }
}
