import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../../../constants/enum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profiles/entities/profiles';

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

  @Field(() => String, {nullable: true, defaultValue:  null})
  @Column({nullable: true, default: null})
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

  @OneToOne(() => Profile, profile => profile.User)
  Profile: Profile;
}

@ObjectType()
export class ActivateResponse {
  @Field()
  Message: string;
}
