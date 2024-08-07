import { Injectable } from '@nestjs/common';
import { CreateSparePartDto } from './dto/create-spare_part.dto';
import { UpdateSparePartDto } from './dto/update-spare_part.dto';

@Injectable()
export class SparePartService {
  create(createSparePartDto: CreateSparePartDto) {
    return 'This action adds a new sparePart';
  }

  findAll() {
    return `This action returns all sparePart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sparePart`;
  }

  update(id: number, updateSparePartDto: UpdateSparePartDto) {
    return `This action updates a #${id} sparePart`;
  }

  remove(id: number) {
    return `This action removes a #${id} sparePart`;
  }
}
