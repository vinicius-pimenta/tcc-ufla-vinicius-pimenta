import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
  name: 'noob',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'gobarber_sem_ddd',
  migrations: ['./src/external/repositories/typeorm/database/migrations/*.ts'],
  entities: ['./src/external/repositories/typeorm/entities/*.ts'],
  cli: {
    migrationsDir: './src/external/repositories/typeorm/database/migrations',
  },
};
//   {
//     name: "mongo",
//     type: "mongodb",
//     host: "localhost",
//     port: 27017,
//     database: "gobarber",
//     useUnifiedTopology: true,
//     entities: [
//       "./src/external/repositories/typeorm/entities/*.ts"
//     ]
//   }
// ]
