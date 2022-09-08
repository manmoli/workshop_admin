import { CreateClientDto } from '../../modules/clients/dto/create-client.dto'
import { Client } from '../../modules/clients/entities/client.entity'

export const createClientDto: CreateClientDto = {
  fist_name: 'Manuel',
  second_name: '',
  last_name: 'Molina',
  age: 31,
  image_url: '',
  tax_id: 'MOPM910802HF2'
}

export const client1 = new Client()
export const client2 = new Client()
export const client3 = new Client()
export const client4 = new Client()
export const specificClient = new Client()
specificClient.id = 1
export const updatedSpecificClient = specificClient
updatedSpecificClient.fist_name = 'Manuel'

export const clientsArray = [client1, client2, client3, client4]
