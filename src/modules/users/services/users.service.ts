import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { FindOptions } from '../../../utils/types'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../entities/users.entity'
import * as _ from 'lodash'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    const user: User = await this.userRepo.create(createUserDto)
    await this.userRepo.save(user)

    return user
  }

  async findAll(findOptions?: FindOptions<User>): Promise<User[]> {
    const user: User[] = await this.userRepo.find(findOptions)

    return user
  }

  async findOne(id: number): Promise<User> {
    const user: User = await this.userRepo.findOneBy({ id })

    if (user === null) {
      throw new EntityNotFoundError(User, { id })
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { affected } = await this.userRepo.update({ id }, updateUserDto)

    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(User, { id })
    }

    const user: User = await this.userRepo.findOneBy({ id })

    return user
  }

  async remove(id: number): Promise<boolean> {
    const { affected } = await this.userRepo.delete({ id })

    if (affected === 0) {
      throw new EntityNotFoundError(User, { id })
    }

    return affected === 1
  }

  async authenticate(phone_number: string, password: string): Promise<string> {
    const user: User = await this.userRepo.findOne({
      where: { phone_number }
    })

    if (!user) {
      throw new Error('Invalid phone_number or password')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      throw new Error('Invalid phone_number or password')
    }

    const payload = {
      userId: user.id,
      phone_number: user.phone_number
    }

    const secret = process.env.JWT_SECRET
    const expiresIn = '1h'

    const token = jwt.sign(payload, secret, { expiresIn })

    return token
  }
}
