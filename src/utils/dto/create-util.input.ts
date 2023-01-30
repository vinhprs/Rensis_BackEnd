import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUtilInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
