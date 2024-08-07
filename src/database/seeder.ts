import { DataSource } from 'typeorm';
import { ServiceType } from '../modules/service_type/entities/service_type.entity';
import { seedServiceTypes } from './service_type.seeder';
import { dataSourceOptions } from '../conf';

const AppDataSource = new DataSource({ ...dataSourceOptions, entities: [ServiceType] });

async function runSeeder() {
    await AppDataSource.initialize();
    await seedServiceTypes(AppDataSource);
    await AppDataSource.destroy();
}

runSeeder()
    .then(() => console.log('Seeding completed successfully.'))
    .catch((error) => console.error('Error seeding data:', error));
