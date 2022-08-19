import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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

  async findOne(id: number): Promise<BranchOffice> {
    const branch: BranchOffice = await this.branchRepo.findOne({
      where: { id }
    })
    if (branch === null) {
      throw new NotFoundException('branch not found')
    }

    return branch
  }

  async create(branch: CreateBranchDto): Promise<BranchOffice> {
    const newBranch: BranchOffice = this.branchRepo.create(branch)

    return this.branchRepo.save(newBranch)
  }

  async update(
    id: number,
    branchUpdate: CreateBranchDto
  ): Promise<BranchOffice> {
    const branch: BranchOffice = await this.branchRepo.findOne({
      where: { id }
    })
    if (branch === null) {
      const newBranch: BranchOffice = await this.branchRepo.create(branchUpdate)

      return this.branchRepo.save(newBranch)
    } else {
      return this.branchRepo.merge({ ...branch, ...branchUpdate }, branch)
    }
  }

  async delete(id: number): Promise<void> {
    const { affected } = await this.branchRepo.delete(id)
    if (affected === 0) {
      throw new NotFoundException()
    }
  }
}
