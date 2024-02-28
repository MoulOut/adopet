import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: './src/config/db.sqlite',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
});
