import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Role } from '../../../constants/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  User_ID: string;

  @Field(() => String)
  @Column()
  Email!: string;

  @Field(() => String)
  @Column()
  Password!: string;

  @Field(() => String)
  @Column()
  Otp!: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({default: false})
  isActivate: boolean;

  @Field(() => Role)
  @Column({type: 'enum', enum: Role, default: Role.BABY})
  Role!: Role;

  @Field(() => Boolean, { defaultValue: false })
  @Column({default: false})
  isBlocked: boolean;
}
