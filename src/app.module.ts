import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ValidationPipe } from './pipes/validation.pipe';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

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
        "entities": [ User ],
        "migrations": ["src/migration/**/*.ts"],
        "autoLoadEntities": true,
        "synchronize": false
      }),
      inject: [ConfigService]
  }),
    AuthModule,
    UserModule,

  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: "APP_PIPE",
    useClass: ValidationPipe
  }],
})
export class AppModule {}
