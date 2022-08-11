import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import config from '../../conf'
import { BranchOffice } from '../entities/branch.entity'
import { Repository } from 'typeorm'
import { CreateBranchDto } from '../dtos/branch.dto'

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(BranchOffice) private branchRepo: Repository<BranchOffice>
  ) {}

  async findAll(): Promise<BranchOffice[]> {
    const branches: BranchOffice[] = await this.branchRepo.find()
    return branches
  }

  findOne(id: number): Promise<BranchOffice> {
    return this.branchRepo.findOne({ where: { id } })
  }

  create(branch: CreateBranchDto): Promise<BranchOffice> {
    const newBranch: BranchOffice = this.branchRepo.create(branch)

    return this.branchRepo.save(newBranch)
  }

  async update(
    id: number,
    partialBranch: Partial<BranchOffice>
  ): Promise<BranchOffice> {
    const prevBranch: BranchOffice = await this.branchRepo.findOne({
      where: { id }
    })
    const result: BranchOffice = await this.branchRepo.merge(
      prevBranch,
      partialBranch
    )

    return result
  }
}
