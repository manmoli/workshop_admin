import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "../../../customers/entities/customers.entity";
import { CommonCustomerService } from "./common-customers.service";


@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    providers: [CommonCustomerService],
    exports: [CommonCustomerService],
})
export class CommonCustomerModule {}