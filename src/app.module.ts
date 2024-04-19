import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/users/entities/user.entity';
import { UsersModule } from './modules/users/users.module';
import { configuration } from './config'
import { UtilsService } from './common/utility/utils.service';
import { UtilsModule } from './common/utility/utils.module';
import { GroceryModule } from './modules/grocery/grocery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'restapi',
      entities: [User],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [configuration],
    }),
    UsersModule,
    UtilsModule,
    GroceryModule
  ],
  controllers: [AppController],
  providers: [AppService, UtilsService],
})
export class AppModule { }
