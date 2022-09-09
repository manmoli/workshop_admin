import { CreateClientDto } from '../../modules/clients/dto/create-client.dto'
import { Client } from '../../modules/clients/entities/client.entity'

export const createClientDto: CreateClientDto = {
  first_name: 'Manuel',
  second_name: '',
  last_name: 'Molina',
  age: 31,
  image_url: 'dsoiuasd93fd',
  tax_id: 'MOPM910802HF2',
  client_id: ''
}

export const createClientDto1: CreateClientDto = {
  ...createClientDto,
  tax_id: 'MOPM910802HF1',
  image_url: 'dsoiuasdf',
  first_name: 'Manuel',
  second_name: 'Antonio',
  client_id: '34ewrdsaf'
}
export const createClientDto2: CreateClientDto = {
  ...createClientDto,
  tax_id: 'MOPM910802HF3',
  image_url: 'dsoiu',
  first_name: 'Ricardo',
  client_id: '234dsf'
}
export const createClientDto3: CreateClientDto = {
  ...createClientDto,
  tax_id: 'MOPM910802HF4',
  image_url: '8923',
  last_name: '',
  first_name: 'Roberto',
  client_id: '234efd'
}
export const createClientDto4: CreateClientDto = {
  ...createClientDto,
  tax_id: 'MOPM910802HF5',
  image_url: 'djhf',
  first_name: 'Lina',
  client_id: '324sdaf'
}
export const createClientDto5: CreateClientDto = {
  ...createClientDto,
  tax_id: 'MOPM910802HF6',
  image_url: 'jads',
  first_name: 'Alfredo',
  client_id: '2134dsaf'
}
export const createClientDto6: CreateClientDto = {
  ...createClientDto,
  tax_id: 'MOPM910802HF7',
  image_url: 'adsf',
  first_name: 'Evelyn',
  client_id: '23dfg'
}

export const clientsForCreation: CreateClientDto[] = [
  createClientDto,
  createClientDto1,
  createClientDto2,
  createClientDto3,
  createClientDto4,
  createClientDto5,
  createClientDto6
]

export const client1 = new Client()
export const client2 = new Client()
export const client3 = new Client()
export const client4 = new Client()
export const specificClient = new Client()
specificClient.id = 1
export const updatedSpecificClient = specificClient
updatedSpecificClient.first_name = 'Manuel'

export const clientsArray = [client1, client2, client3, client4]
