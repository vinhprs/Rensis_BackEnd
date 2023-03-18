import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEducationInput {
  @Field(() => String)
  Title: string;

  @Field(() => String)
  Certificate_Place: string;

  @Field(() => String)
  Level: string;

  @Field(() => Date)
  Graduation_Time: Date;
}
