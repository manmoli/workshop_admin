import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { DepartmentsService } from 'src/departments/services/departments.service'
import { CreateBranchDto, UpdateBranchDto } from '../dtos/branch.dto'
import { BranchOffice } from '../entities/branch.entity'
import { WorkshopService } from '../services/workshop.service'

@Controller('branch')
export class WorkshopController {
  constructor(
    private workShopService: WorkshopService,
    private departmentsService: DepartmentsService
  ) {}

  @Get()
  get(): Promise<BranchOffice[]> {
    return this.workShopService.findAll()
  }

  @Post()
  create(@Body() branch: CreateBranchDto) {
    return this.workShopService.create(branch)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() branch: UpdateBranchDto) {
    return this.workShopService.update(id, branch)
  }

  @Get(':id/departments')
  getDepartments(@Param('id', ParseIntPipe) id: number) {
    return this.departmentsService.findAll({ branchId: id })
  }
}
