import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../../../customers/entities/customers.entity";
import { Repository } from "typeorm";
import { CommonCustomerServiceI } from "./common-customer.interfaces";

@Injectable()
export class CommonCustomerService {
    constructor(
        @InjectRepository(Customer) private customerRepo: Repository<Customer>
    ) { }

    findOne(customerId: number): Promise<any> {
        return this.customerRepo.findOneBy({ id: customerId });
    }
}
