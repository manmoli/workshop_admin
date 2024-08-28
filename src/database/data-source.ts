import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../conf';

export const AppDataSource = new DataSource({
    ...dataSourceOptions,
    synchronize: false, // Always false in production
});

// Initialize the data source (optional, depending on your use case)
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

export {}