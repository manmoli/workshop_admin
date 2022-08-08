import { Injectable } from '@nestjs/common'

@Injectable()
export class WorkshopService {
  getWorkshop(): string {
    return 'Hello World!'
  }
}
