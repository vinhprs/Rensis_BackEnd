import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SendEmailResponse {
    @Field()
    Status: string;

    @Field()
    Message: string
}