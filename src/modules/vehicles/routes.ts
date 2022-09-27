import { VehiclesModule } from './vehicles.module'

export const vehicleRouteTree = {
  path: 'clients/:id',
  child: {
    path: 'vehicles',
    module: VehiclesModule
  }
}
