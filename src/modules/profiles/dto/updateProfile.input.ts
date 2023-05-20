import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProfileInput {
    @Field(() => String, {nullable: true})
    Nick_Name?: string;

    @Field(() => String, {nullable: true})
    Hobby?: string;

    @Field(() => String, {nullable: true})
    Education?: string;

    @Field(() => String, {nullable: true})
    Description?: string;

}