import { CreateExpectationInput } from './create-expectation.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExpectationInput extends PartialType(CreateExpectationInput) {
  @Field(() => Int)
  id: number;
}
