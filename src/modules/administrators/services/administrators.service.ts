import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
import { FindOptions } from '../../../utils/types'
import { CreateAdministratorDto } from '../dto/create-administrator.dto'
import { UpdateAdministratorDto } from '../dto/update-administrator.dto'
import { Administrator } from '../entities/administrator.entity'
import * as _ from 'lodash'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AdministratorsService {
  constructor(
    @InjectRepository(Administrator)
    private administratorRepo: Repository<Administrator>
  ) {}

  async create(
    createAdministratorDto: CreateAdministratorDto
  ): Promise<Administrator> {
    createAdministratorDto.password = await bcrypt.hash(
      createAdministratorDto.password,
      10
    )
    const administrator: Administrator = await this.administratorRepo.create(
      createAdministratorDto
    )
    await this.administratorRepo.save(administrator)

    console.log(administrator)

    return administrator
  }

  async findAll(
    findOptions?: FindOptions<Administrator>
  ): Promise<Administrator[]> {
    const administrators: Administrator[] = await this.administratorRepo.find(
      findOptions
    )

    return administrators
  }

  async findOne(id: number): Promise<Administrator> {
    const administrator: Administrator = await this.administratorRepo.findOneBy(
      { id }
    )

    if (administrator === null) {
      throw new EntityNotFoundError(Administrator, { id })
    }

    return administrator
  }

  async update(
    id: number,
    updateAdministratorDto: UpdateAdministratorDto
  ): Promise<Administrator> {
    const { affected } = await this.administratorRepo.update(
      { id },
      updateAdministratorDto
    )

    if (_.isNil(affected) || affected === 0) {
      throw new EntityNotFoundError(Administrator, { id })
    }

    const administrator: Administrator = await this.administratorRepo.findOneBy(
      { id }
    )

    return administrator
  }

  async remove(id: number): Promise<boolean> {
    const { affected } = await this.administratorRepo.delete({ id })

    if (affected === 0) {
      throw new EntityNotFoundError(Administrator, { id })
    }

    return affected === 1
  }

  async authenticate(phone_number: string, password: string): Promise<string> {
    const administrator: Administrator = await this.administratorRepo.findOne({
      where: { phone_number }
    })

    if (!administrator) {
      throw new Error('Invalid phone_number or password')
    }

    const isValid = await bcrypt.compare(password, administrator.password)
    if (!isValid) {
      throw new Error('Invalid phone_number or password')
    }

    const payload = {
      administratorId: administrator.id,
      phone_number: administrator.phone_number
    }

    const secret = process.env.JWT_SECRET
    const expiresIn = '1h'

    const token = jwt.sign(payload, secret, { expiresIn })

    return token
  }
}
