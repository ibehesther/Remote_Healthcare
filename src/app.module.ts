import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entites/user.entity';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        "type": "mysql",
        "host": "127.0.0.1",
        "port": 3306,
        "username": configService.get('DATABASE_USER'),
        "password": configService.get('DATABASE_PASSWORD'),
        "database": "test",
        "entities": [ User],
        "autoLoadEntities": true,
        "synchronize": false
      }),
      inject: [ConfigService]
  }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
