import { Injectable } from '@nestjs/common';
import { CreateServiceOrderDto } from './dto/create-service_order.dto';
import { UpdateServiceOrderDto } from './dto/update-service_order.dto';

@Injectable()
export class ServiceOrderService {
  create(createServiceOrderDto: CreateServiceOrderDto) {
    return 'This action adds a new serviceOrder';
  }

  findAll() {
    return `This action returns all serviceOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceOrder`;
  }

  update(id: number, updateServiceOrderDto: UpdateServiceOrderDto) {
    return `This action updates a #${id} serviceOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceOrder`;
  }
}
