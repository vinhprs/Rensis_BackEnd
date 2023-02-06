import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileImageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
