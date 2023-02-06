import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExpectationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
