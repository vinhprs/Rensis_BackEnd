import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { BabyCharacteristics } from '../../../constants/enum';
import { Expectation } from '../../expectations/entities/expectation.entity';
import { JoinColumn, OneToOne } from 'typeorm';
import { Profile } from '../entities/profiles';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  Profile_Name: string;

  @Field(() => String, {nullable: true, defaultValue: null})
  Nick_Name?: string;

  @Field(() => String, {nullable: true, defaultValue: null})
  Hobby?: string;
  
  @Field(() => Int, {nullable: true, defaultValue: null})
  Age?: number;

  @Field(() => String, {nullable: true, defaultValue: null})
  Characteristic?: BabyCharacteristics;

  @Field(() => String, {nullable: true, defaultValue: null})
  Description?: string;

  @Field(() => User)
  User: User;

  @Field(() => Expectation, {nullable: true, defaultValue: null})
  Expectation: Expectation;
}