import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { BabyCharacteristics } from '../../../constants/enum';

@InputType()
export class CreateExpectationInput {
  @Field(() => String, {nullable: false})
  Profile_ID!: string;

  @Field(() => Int, {nullable: true})
  Age?: number;

  @Field(() => BabyCharacteristics, {nullable: true})
  Characteristics?: BabyCharacteristics;

  @Field(() => Float, {nullable: true})
  Distance?: number;

  @Field(() => Float, {nullable: true})
  Paid?: number;

  @Field(() => String, {nullable: true})
  Type?: string;

  @Field(() => String, {nullable: true})
  Description?: string;
}
