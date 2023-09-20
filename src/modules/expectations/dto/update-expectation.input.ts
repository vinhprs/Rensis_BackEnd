import { BabyCharacteristics } from 'src/constants/enum';
import { CreateExpectationInput } from './create-expectation.input';
import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateExpectationInput extends PartialType(CreateExpectationInput) {
  @Field(() => String, {nullable: false})
  Expectation_ID!: string;

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
