import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  Email: string;

  @Field(() => String)
  Password: string;

  @Field(() => String)
  Confirm_Password: string;

  @Field(() => String)
  Role: string;
}
