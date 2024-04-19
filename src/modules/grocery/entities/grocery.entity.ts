
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grocery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('int64')
    price: number;

    @Column('int64')
    inventory: number;

    @Column('date')
    createdAt: Date

    @Column('date')
    updatedAt: Date
}
