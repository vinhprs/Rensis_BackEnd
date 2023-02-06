import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileImagesService } from './profile-images.service';
import { ProfileImage } from './entities/profile-image.entity';
import { CreateProfileImageInput } from './dto/create-profile-image.input';
import { UpdateProfileImageInput } from './dto/update-profile-image.input';

@Resolver(() => ProfileImage)
export class ProfileImagesResolver {
  constructor(private readonly profileImagesService: ProfileImagesService) {}

  @Mutation(() => ProfileImage)
  createProfileImage(@Args('createProfileImageInput') createProfileImageInput: CreateProfileImageInput) {
    return this.profileImagesService.create(createProfileImageInput);
  }

  @Query(() => [ProfileImage], { name: 'profileImages' })
  findAll() {
    return this.profileImagesService.findAll();
  }

  @Query(() => ProfileImage, { name: 'profileImage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileImagesService.findOne(id);
  }

  @Mutation(() => ProfileImage)
  updateProfileImage(@Args('updateProfileImageInput') updateProfileImageInput: UpdateProfileImageInput) {
    return this.profileImagesService.update(updateProfileImageInput.id, updateProfileImageInput);
  }

  @Mutation(() => ProfileImage)
  removeProfileImage(@Args('id', { type: () => Int }) id: number) {
    return this.profileImagesService.remove(id);
  }
}
