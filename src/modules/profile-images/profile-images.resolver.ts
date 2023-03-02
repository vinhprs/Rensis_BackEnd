import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileImagesService } from './profile-images.service';
import { ProfileImage } from './entities/profile-image.entity';
import { CreateProfileImageInput } from './dto/create-profile-image.input';
import { UpdateProfileImageInput } from './dto/update-profile-image.input';

@Resolver(() => ProfileImage)
export class ProfileImagesResolver {
  constructor(private readonly profileImagesService: ProfileImagesService) {}

}
