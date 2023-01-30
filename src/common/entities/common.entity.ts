import { Field, ObjectType } from "@nestjs/graphql";
import { Stream } from "stream";
import { User } from "../../modules/users/entities/user.entity";

@ObjectType()
export class IJwtPayload {
    @Field({ nullable: true })
    id: string;
}

@ObjectType()
export class JwtPayload {
    @Field({nullable: true})
    Access_Token: string;

    @Field(() => User, {nullable: true})
    User: User
}
