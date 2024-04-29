import { Module } from '@nestjs/common';
import { BillingInfoService } from './billing_info.service';
import { BillingInfoController } from './billing_info.controller';

@Module({
  controllers: [BillingInfoController],
  providers: [BillingInfoService]
})
export class BillingInfoModule {}
