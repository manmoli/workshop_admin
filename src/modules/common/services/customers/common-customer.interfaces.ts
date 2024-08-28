import { Customer } from "../../../customers/entities/customers.entity";

export abstract class CommonCustomerServiceI {
    findOne: (id: number) => Promise<Customer>
}
