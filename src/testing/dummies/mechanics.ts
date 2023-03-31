import { CreateMechanicDto } from '../../modules/mechanics/dto/create-mechanic.dto'
import { UpdateMechanicDto } from '../../modules/mechanics/dto/update-mechanic.dto'
import { Mechanic } from '../../modules/mechanics/entities/mechanic.entity'

export const createMechanicDto: CreateMechanicDto = {
  first_name: 'Chucho',
  second_name: 'Sepa',
  last_name: 'LaV',
  age: 31,
  image_url: '',
  phone_number: '9994477040'
}

export const updatedMechanicDto: UpdateMechanicDto = {
  second_name: 'ah',
  last_name: 'YaSé'
}

export const mechanic1: Mechanic = new Mechanic()
mechanic1.first_name = 'Chucho'
mechanic1.second_name = 'Sepa'
mechanic1.last_name = 'LaV'
mechanic1.age = 31
mechanic1.image_url = ''
mechanic1.services = []
mechanic1.employeeId = 'fgadfggg'

export const mechanic2: Mechanic = new Mechanic()
mechanic1.first_name = 'Ala'
mechanic1.second_name = 'N'
mechanic1.last_name = 'mms'
mechanic1.age = 31
mechanic1.image_url = ''
mechanic1.services = []
mechanic1.employeeId = 'hdfhagag'

export const mechanic3: Mechanic = new Mechanic()
mechanic1.first_name = 'sdagads'
mechanic1.second_name = 'Sefasdfpa'
mechanic1.last_name = 'LaadsfadsV'
mechanic1.age = 31
mechanic1.image_url = ''
mechanic1.services = []
mechanic1.employeeId = 'dfasdgasdgah'

export const mechanics: Array<Mechanic> = [mechanic1, mechanic2, mechanic3]
