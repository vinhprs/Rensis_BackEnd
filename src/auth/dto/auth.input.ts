import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../../constants/enum';

@InputType()
export class SignupInput {
  @Field(() => String)
  Email: string;

  @Field(() => String)
  Password: string;

  @Field(() => String)
  Confirm_Password: string;

  @Field(() => String)
  Role: Role;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  Email: string;

  @Field(() => String)
  Password: string;
}

@InputType()
export class ActivateAccountInput {
  @Field(() => String)
  Email: string;

  @Field(() => String)
  Otp: string;
}