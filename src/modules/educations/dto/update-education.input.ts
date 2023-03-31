import { CreateEducationInput } from './create-education.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEducationInput extends PartialType(CreateEducationInput) {

  @Field(() => String)
  Education_ID: string;

  @Field(() => String, {nullable: true})
  Title?: string;

  @Field(() => String,  {nullable: true})
  Certificate_Place?: string;

  @Field(() => String, {nullable: true})
  Level?: string;

  @Field(() => Date, {nullable: true})
  Graduation_Time?: Date;

}
