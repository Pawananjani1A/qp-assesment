import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { OrderGrcoeryDto } from './dto/order-grocery.dto';
import { GroceryService } from '../grocery/grocery.service';
import { Grocery } from '../grocery/entities/grocery.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => GroceryService))
    private groceryService: GroceryService
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const toUpdate = await this.userRepository.findOne({ where: { id } });

    const updated = Object.assign(toUpdate, updateUserDto);

    return await this.userRepository.save(updated);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async OrderGrocery(orderGrcoeryDto: OrderGrcoeryDto) {

    let items: Grocery[] = [];

    for (let order of orderGrcoeryDto.groceryItems) {
      let item = await this.groceryService.orderGroceryItem(order.groceryId, order.count);
      items.push(item);
    }

    return items;
  }
}
