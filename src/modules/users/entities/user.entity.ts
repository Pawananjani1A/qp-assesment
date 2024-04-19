import { ROLES } from 'src/common/constants/environment_constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstname: string;

  @Column('text')
  lastname: string;

  @Column('text')
  email: string;

  @Column('text')
  userType: ROLES;

  @Column('date')
  createdAt: Date

  @Column('date')
  updatedAt: Date
}
