import { InputType, Field } from '@nestjs/graphql';
import { FileUpload } from 'src/common/interfaces/common.interface';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class UploadImageInput {
  @Field(() => GraphQLUpload, {nullable: true, defaultValue: null})
  Avatar?: Promise<FileUpload>;

  @Field(() => [GraphQLUpload], {nullable: true, defaultValue: null})
  Profile_Images?: Array<Promise<FileUpload>>;
}