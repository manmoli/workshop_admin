import { IsNumber, IsString } from "class-validator"

export class CreateVehicleModelDto {

    @IsString()
    brand: string

    @IsString()
    model: string

    @IsNumber()
    model_year: number

    @IsNumber()
    cylinders: number

    @IsString()
    vehicle_engine: string //displ

    @IsString()
    vehicle_transmission: string
}


