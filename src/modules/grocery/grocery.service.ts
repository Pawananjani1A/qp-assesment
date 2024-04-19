import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grocery } from './entities/grocery.entity';
import { Repository } from 'typeorm';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { UsersService } from '../users/users.service';
import { ROLES } from 'src/common/constants/environment_constants';


@Injectable()
export class GroceryService {
    constructor(
        @InjectRepository(Grocery)
        private groceryRepository: Repository<Grocery>,

        @Inject(forwardRef(() => UsersService)) private usersService: UsersService
    ) { }

    async create(createGroceryDto: CreateGroceryDto) {

        let user = await this.usersService.findOne(createGroceryDto.creatorId);
        if (user.userType != ROLES.ADMIN) {
            throw new Error('Only AdminsCan Add a grocery item')
        }
        return await this.groceryRepository.save(createGroceryDto);
    }

    async findAll() {
        return await this.groceryRepository.find();
    }

    async findOne(id: number) {
        return await this.groceryRepository.findOne({ where: { id } });
    }

    async update(id: number, updateGroceryDto: UpdateGroceryDto) {
        let user = await this.usersService.findOne(updateGroceryDto.creatorId);
        if (user.userType != ROLES.ADMIN) {
            throw new Error('Only AdminsCan Update a grocery item')
        }

        const toUpdate = await this.groceryRepository.findOne({ where: { id } });

        const updated = Object.assign(toUpdate, updateGroceryDto);

        return await this.groceryRepository.save(updated);
    }

    async remove(id: number, removerId: number) {
        let user = await this.usersService.findOne(removerId);
        if (user.userType != ROLES.ADMIN) {
            throw new Error('Only AdminsCan Update a grocery item')
        }
        return await this.groceryRepository.delete(id);
    }

    async orderGroceryItem(id: number, count: number) {

        const toUpdate = await this.groceryRepository.findOne({ where: { id } });

        if (toUpdate.inventory < count) {
            throw new Error('Item out of stock');
        }

        let updatedGroceryItem: UpdateGroceryDto = {
            inventory: toUpdate.inventory - count,
        }
        const updated = Object.assign(toUpdate, updatedGroceryItem);

        return await this.groceryRepository.save(updated);
    }
}
