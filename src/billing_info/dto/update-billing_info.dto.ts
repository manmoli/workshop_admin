import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingInfoDto } from './create-billing_info.dto';

export class UpdateBillingInfoDto extends PartialType(CreateBillingInfoDto) {}
