import { Test, TestingModule } from '@nestjs/testing';
import { GroceryService } from './grocery.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Grocery } from './entities/grocery.entity';
import { CreateGroceryDto } from './dto/create-grocery.dto';

describe('GroceryService', () => {
  let service: GroceryService;

  const mockGroceryRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroceryService,
        {
          provide: getRepositoryToken(Grocery),
          useValue: mockGroceryRepository,
        }
      ],
    }).compile();

    service = module.get<GroceryService>(GroceryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => Should create a new user and return its data', async () => {
    // arrange
    const createGroceryDto = {
      name: 'Shoes',
      price: 5000,
      inventory: 20,
    } as CreateGroceryDto;

    const grocery = {
      id: Date.now(),
      name: 'Puma',
      price: 5000,
      inventory: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Grocery;

    jest.spyOn(mockGroceryRepository, 'save').mockReturnValue(grocery);

    // act
    const result = await service.create(createGroceryDto);

    // assert
    expect(mockGroceryRepository.save).toBeCalled();
    expect(mockGroceryRepository.save).toBeCalledWith(createGroceryDto);

    expect(result).toEqual(grocery);
  });

  it('findAll => should return an array of groceries', async () => {
    //arrange
    const grocery = {
      id: Date.now(),
      nane: 'Puma',
      price: 5000,
      inventory: 20,
    };
    const groceries = [grocery];
    jest.spyOn(mockGroceryRepository, 'find').mockReturnValue(groceries);

    //act
    const result = await service.findAll();

    // assert
    expect(result).toEqual(groceries);
    expect(mockGroceryRepository.find).toBeCalled();
  });

  it('findOne => should find a grocery by a given id and return its data', async () => {
    //arrange
    const id = 1;
    const grocery = {
      id: 1,
      nane: 'Puma',
      price: 5000,
      inventory: 20,
    };

    jest.spyOn(mockGroceryRepository, 'findOne').mockReturnValue(grocery);

    //act
    const result = await service.findOne(id);

    expect(result).toEqual(grocery);
    expect(mockGroceryRepository.findOne).toBeCalled();
    expect(mockGroceryRepository.findOne).toBeCalledWith({ where: { id } });
  });

  it('remove => should find a grocery by a given id, remove and then return Number of affected rows', async () => {
    const id = 1;
    const grocery = {
      id: 1,
      nane: 'Puma',
      price: 5000,
      inventory: 20,
    };

    jest.spyOn(mockGroceryRepository, 'delete').mockReturnValue(grocery);

    //act
    const result = await service.remove(id, 1);

    expect(result).toEqual(grocery);
    expect(mockGroceryRepository.delete).toBeCalled();
    expect(mockGroceryRepository.delete).toBeCalledWith(id);
  });


});
