import { CreateCustomerDto, CreateCustomerWIthImageDto } from '../../modules/customers/dto/create-customers.dto'
import { Customer } from '../../modules/customers/entities/customers.entity'

export const createCustomerDto: CreateCustomerDto = {
  first_name: 'Manuel',
  second_name: '',
  last_name: 'Molina',
  age: 31,
  image_url: 'dsoiuasd93fd',
  customer_id: '',
  phone_number: '8172381723'
}

export const createCustomerDtoWPhoto: CreateCustomerWIthImageDto = {
  first_name: 'Manuel',
  second_name: '',
  last_name: 'Molina',
  age: 31,
  image_url: 'dsoiuasd93fd',
  customer_id: '',
  phone_number: '8172381723',
  photo: null
}

export const createCustomerDto1: CreateCustomerDto = {
  ...createCustomerDto,
  image_url: 'dsoiuasdf',
  first_name: 'Manuel',
  second_name: 'Antonio',
  customer_id: '34ewrdsaf'
}
export const createCustomerDto2: CreateCustomerDto = {
  ...createCustomerDto,
  image_url: 'dsoiu',
  first_name: 'Ricardo',
  customer_id: '234dsf'
}
export const createCustomerDto3: CreateCustomerDto = {
  ...createCustomerDto,
  image_url: '8923',
  last_name: '',
  first_name: 'Roberto',
  customer_id: '234efd'
}
export const createCustomerDto4: CreateCustomerDto = {
  ...createCustomerDto,
  image_url: 'djhf',
  first_name: 'Lina',
  customer_id: '324sdaf'
}
export const createCustomerDto5: CreateCustomerDto = {
  ...createCustomerDto,
  image_url: 'jads',
  first_name: 'Alfredo',
  customer_id: '2134dsaf'
}
export const createCustomerDto6: CreateCustomerDto = {
  ...createCustomerDto,
  image_url: 'adsf',
  first_name: 'Evelyn',
  customer_id: '23dfg'
}

export const clientsForCreation: CreateCustomerDto[] = [
  createCustomerDto,
  createCustomerDto1,
  createCustomerDto2,
  createCustomerDto3,
  createCustomerDto4,
  createCustomerDto5,
  createCustomerDto6
]

export const client1 = new Customer()
export const client2 = new Customer()
export const client3 = new Customer()
export const client4 = new Customer()
export const specificCustomer = new Customer()
specificCustomer.id = 1
export const updatedSpecificClient = specificCustomer
updatedSpecificClient.first_name = 'Manuel'

export const clientsArray = [client1, client2, client3, client4]
