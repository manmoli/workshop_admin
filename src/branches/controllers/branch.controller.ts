import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { CreateBranchDto, UpdateBranchDto } from '../dtos/branch.dto'
import { WorkshopService } from '../services/workshop.service'

@Controller('branch')
export class WorkshopController {
  constructor(private readonly appService: WorkshopService) {}

  @Get()
  getHello(): string {
    return this.appService.getWorkshop()
  }

  @Post()
  createBranch(@Body() branch: CreateBranchDto) {
    console.log('asd')
    console.log(branch)
  }

  @Put()
  updateBranch(@Body() branch: UpdateBranchDto) {
    console.log(branch)
  }
}
