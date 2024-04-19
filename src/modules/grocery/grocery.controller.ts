import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { getApiBasePrefix } from 'src/common/utility/generic';
import { GroceryService } from './grocery.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';

const basePrefix = getApiBasePrefix('appClient')
@Controller(`${basePrefix}/grocery`)
export class GroceryController {
    constructor(private readonly groceryService: GroceryService) { }

    @Post()
    create(@Body() createGroceryDto: CreateGroceryDto) {
        return this.groceryService.create(createGroceryDto);
    }

    @Get()
    findAll() {
        return this.groceryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.groceryService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGroceryDto: UpdateGroceryDto) {
        return this.groceryService.update(+id, updateGroceryDto);
    }

    @Delete(':groceryId/:removerId')
    remove(@Param('groceryId') groceryId: string, @Param('removerId') removerId: string) {
        return this.groceryService.remove(+groceryId, +removerId);
    }
}
