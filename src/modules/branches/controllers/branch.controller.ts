import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common'
import { CreateBranchDto } from '../dtos/branch.dto'
import { BranchOffice } from '../entities/branch.entity'
import { WorkshopService } from '../services/branch.service'

@Controller('branch')
export class WorkshopController {
  constructor(private workShopService: WorkshopService) {}

  @Get()
  get(): Promise<BranchOffice[]> {
    return this.workShopService.findAll()
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<BranchOffice> {
    return this.workShopService.findOne(id)
  }

  @Post()
  create(@Body() branch: CreateBranchDto): Promise<BranchOffice> {
    return this.workShopService.create(branch)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() branch: CreateBranchDto) {
    return this.workShopService.update(id, branch)
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.workShopService.delete(id)
  }

  @Get(':id/departments')
  getDepartments(@Param('id', ParseIntPipe) id: number): Array<any> {
    return []
  }
}
