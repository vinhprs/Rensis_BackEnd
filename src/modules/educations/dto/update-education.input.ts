import { CreateEducationInput } from './create-education.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEducationInput extends PartialType(CreateEducationInput) {
  @Field(() => Int)
  id: number;
}
