import { Injectable } from '@nestjs/common';
import { CreateBillingInfoDto } from './dto/create-billing_info.dto';
import { UpdateBillingInfoDto } from './dto/update-billing_info.dto';

@Injectable()
export class BillingInfoService {
  create(createBillingInfoDto: CreateBillingInfoDto) {
    return 'This action adds a new billingInfo';
  }

  findAll() {
    return `This action returns all billingInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} billingInfo`;
  }

  update(id: number, updateBillingInfoDto: UpdateBillingInfoDto) {
    return `This action updates a #${id} billingInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} billingInfo`;
  }
}
