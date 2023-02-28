import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/user/user.entity';
import { CreateUserTable1677583514763 } from './migrations/1677583514763-CreateUserTable';

config();

const configService = new ConfigService();

export default new DataSource({
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": configService.get('DATABASE_USER'),
    "password": configService.get('DATABASE_PASSWORD'),
    "database": "test",
    "entities": [ User ],
    "migrations": [CreateUserTable1677583514763],
    synchronize: false,
    migrationsRun: true
})