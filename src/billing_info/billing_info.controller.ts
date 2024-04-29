import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillingInfoService } from './billing_info.service';
import { CreateBillingInfoDto } from './dto/create-billing_info.dto';
import { UpdateBillingInfoDto } from './dto/update-billing_info.dto';

@Controller('billing-info')
export class BillingInfoController {
  constructor(private readonly billingInfoService: BillingInfoService) {}

  @Post()
  create(@Body() createBillingInfoDto: CreateBillingInfoDto) {
    return this.billingInfoService.create(createBillingInfoDto);
  }

  @Get()
  findAll() {
    return this.billingInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingInfoDto: UpdateBillingInfoDto) {
    return this.billingInfoService.update(+id, updateBillingInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingInfoService.remove(+id);
  }
}
