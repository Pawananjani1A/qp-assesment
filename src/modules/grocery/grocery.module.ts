import { Module, forwardRef } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grocery } from './entities/grocery.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery]),
  forwardRef(() => UsersModule)],
  controllers: [GroceryController],
  providers: [GroceryService],
  exports: [GroceryService]
})
export class GroceryModule { }
