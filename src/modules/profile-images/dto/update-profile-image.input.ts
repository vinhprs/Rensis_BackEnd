import { CreateProfileImageInput } from './create-profile-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileImageInput extends PartialType(CreateProfileImageInput) {
  @Field(() => Int)
  id: number;
}
